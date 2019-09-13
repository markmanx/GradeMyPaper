const express = require('express');
const {
  ApolloServer,
  AuthenticationError,
  makeExecutableSchema
} = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const { applyMiddleware } = require('graphql-middleware');
const { prisma } = require('./prisma/generated/prisma');
const { rule, shield, and, or, not } = require('graphql-shield');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const bodyParser = require('body-parser');
const request = require('request-promise-native');
const { getSignedUrl } = require('./helpers/fileUpload');

const {
  validateStripeEvent,
  onPaymentIntentSucceeded
} = require('./helpers/stripe');
const { resolvers } = require('./resolvers');
const { to } = require('./helpers/utils');

// The GraphQL schema
const typeDefs = importSchema('schema.graphql');

// Permission rules
const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  if (ctx.user !== null) return true;
  return new AuthenticationError('Not Authenticated');
});

const permissions = shield({
  Query: {
    protectedQuery: isAuthenticated
  },
  Mutation: {
    createCheckoutSession: isAuthenticated
  }
});

const schema = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithMiddleware = applyMiddleware(schema, permissions);

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context: async ({ req }) => {
    // get the user token from the headers
    const token =
      (req.headers.authorization &&
        req.headers.authorization.replace('Bearer ', '')) ||
      '';

    // try to retrieve a user with the token
    const decoded = jwt.decode(token, { complete: true });

    if (decoded !== null) {
      const kid = decoded.header.kid;

      let signingKey;

      try {
        signingKey = await new Promise((resolve, reject) => {
          const jwks = jwksClient({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 10, // Default value
            jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
          });
          jwks.getSigningKey(kid, (err, key) => {
            if (err || !key) {
              reject();
              return;
            }
            resolve(key.publicKey || key.rsaPublicKey);
          });
        });
      } catch (e) {
        throw new AuthenticationError('Not a valid token');
        return;
      }

      const verified = await new Promise((resolve, reject) => {
        jwt.verify(token, signingKey, (err, decoded) => {
          if (err || !decoded) {
            reject();
            return;
          }
          resolve(decoded);
        });
      });

      const { sub } = verified;

      let user = await prisma.user({
        auth0Id: sub
      });

      if (!user) {
        const userInfo = await new request.get({
          url: `https://${process.env.AUTH0_DOMAIN}/userinfo`,
          json: true,
          headers: { Authorization: req.headers.authorization }
        });

        user = await prisma.createUser({
          auth0Id: userInfo.sub,
          email: userInfo.email,
          credits: 0
        });
      }

      return { user, prisma };
    }

    return { user: null, prisma };
  }
});

const app = express();
server.applyMiddleware({ app });

app.post(
  '/stripe-events',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];

    const validated = validateStripeEvent(req.body, sig);

    if (validated.error) {
      return res.status(400).send(`Webhook Error: ${validated.error.message}`);
    }

    const {
      event: { type, data }
    } = validated;

    switch (type) {
      case 'payment_intent.succeeded':
        const {
          object: { customer }
        } = data;

        if (!customer) {
          throw new Error('Could not retrieve customer');
        }

        const [userMatchesErr, userMatches] = await to(
          prisma.users({ where: { stripeCustomerId: customer } })
        );

        if (userMatchesErr || !userMatches.length) {
          throw new Error('Could not retrieve user');
        }

        const user = userMatches[0];

        const [updatedUserErr, updatedUser] = await to(
          prisma.updateUser({
            data: { credits: user.credits + 1 },
            where: { id: user.id }
          })
        );

        if (updatedUserErr || !updatedUser) {
          throw new Error('Could not update user credits');
        }

        return res.status(200).end();
        break;
      // case 'payment_intent.failed':
      //   return res.status(200).end();
      //   break;
      default:
        return res.status(400).end();
    }
  }
);

app.get('/generate-presigned-upload-url', async (req, res) => {
  const signedUrl = await getSignedUrl('hello');

  res.header({
    'access-control-allow-origin': '*'
  });
  res.json({ method: 'PUT', url: signedUrl, fields: {}, headers: {} });
});

const port = process.env.APOLLO_SERVER_PORT;

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`)
);

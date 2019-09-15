const express = require('express');
const {
  ApolloServer,
  AuthenticationError,
  makeExecutableSchema
} = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const { applyMiddleware } = require('graphql-middleware');
const { prisma } = require('./prisma/generated');
const { rule, shield } = require('graphql-shield');
const bodyParser = require('body-parser');

const { authenticationMiddleware } = require('./helpers/authenticationHelper');

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
    createCheckoutSession: isAuthenticated,
    initiateRequest: isAuthenticated
  }
});

const schema = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithMiddleware = applyMiddleware(schema, permissions);

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context: async ({ req }) => {
    return authenticationMiddleware(req, prisma);
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

const port = process.env.APOLLO_SERVER_PORT;

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`)
);

const express = require('express');
const {
  ApolloServer,
  AuthenticationError,
  makeExecutableSchema,
} = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const { applyMiddleware } = require('graphql-middleware');
const { rule, shield } = require('graphql-shield');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const { prisma } = require('./prisma/generated');
const { sendEmail, buildEmailTemplate } = require('./helpers/emailHelper');
const { authenticationMiddleware } = require('./helpers/authenticationHelper');
const {
  validateStripeEvent,
  getUserByStripeId,
  incrementUserCredits,
  markRequestAsPaid,
} = require('./helpers/stripeHelper/stripeHelper');
const { resolvers } = require('./resolvers');
const { to } = require('./helpers/utils');

// The GraphQL schema
const typeDefs = importSchema('schema.graphql');

// Permission rules
const isAuthenticated = rule()(async (parent, args, ctx) => {
  if (ctx.user !== null) return true;
  return new AuthenticationError('Not Authenticated');
});

const permissions = shield({
  Query: {
    request: isAuthenticated,
    requests: isAuthenticated,
  },
  Mutation: {
    createCheckoutSession: isAuthenticated,
    initiateRequest: isAuthenticated,
    generatePresignedUrl: isAuthenticated,
    getDownloadPresignedUrl: isAuthenticated,
  },
});

const schema = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithMiddleware = applyMiddleware(schema, permissions);

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context: async ({ req }) => authenticationMiddleware(req, prisma),
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
      event: { type, data },
    } = validated;

    if (type === 'payment_intent.succeeded') {
      const {
        id,
        customer,
        metadata: { requestId },
      } = data.object;

      const emailTemplate = buildEmailTemplate.newRequest({ requestId });
      await sendEmail(emailTemplate);

      if (requestId) {
        const [updateRequestErr] = await to(
          markRequestAsPaid(prisma, {
            requestId,
            stripeSessionId: id,
          }),
        );

        if (!updateRequestErr) {
          return res.status(200).end();
        }
      }

      const [userErr, user] = await to(
        getUserByStripeId(prisma, {
          stripeCustomerId: customer,
        }),
      );

      if (userErr) {
        return res.status(500).end();
      }

      await incrementUserCredits(prisma, { userId: user.id });
      return res.status(500).end();
    }

    return res.status(400).end();
  },
);

app.use(express.json());
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Content-Type', 'application/json');
  next();
});

app.post(
  '/sendMessage',
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('This email address is invalid'),
    body('message')
      .trim()
      .escape(),
  ],
  async (req, res) => {
    const { errors } = validationResult(req);

    if (errors.length) {
      res.status(500).send(errors[0].msg);
    }

    const { email, message } = req.body;
    const emailTemplate = buildEmailTemplate.newMessage({ email, message });

    await sendEmail(emailTemplate);

    res.send();
  },
);

const port = process.env.APOLLO_SERVER_PORT;

app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}/graphql`));

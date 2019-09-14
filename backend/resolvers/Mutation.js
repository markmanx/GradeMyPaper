const {
  createStripeSession,
  getSku,
  createCustomer
} = require('../helpers/stripe');
const { to } = require('../helpers/utils');
const { config } = require('../config');
const { paperFragment } = require('../fragments/paperFragment');

const Mutation = {
  createCheckoutSession: async (parent, args, ctx) => {
    const { user } = ctx;

    let stripeCustomerId;

    if (!user.stripeCustomerId) {
      const [newCustomerErr, newCustomer] = await to(
        createCustomer(user.email)
      );

      if (newCustomerErr || !newCustomer) {
        console.log(newCustomerErr);
        throw new Error('Could not create customer');
      }

      stripeCustomerId = newCustomer.id;

      const [updatedUserErr, updatedUser] = await to(
        ctx.prisma.updateUser({
          data: { stripeCustomerId },
          where: { id: ctx.user.id }
        })
      );

      if (updatedUserErr || !updatedUser) {
        throw new Error('Could not update user');
      }
    } else {
      stripeCustomerId = user.stripeCustomerId;
    }

    const [skuErr, sku] = await to(getSku(config.stripe.sku));

    if (skuErr || !sku) {
      throw new Error('Invalid SKU');
    }

    const [sessionErr, session] = await to(
      createStripeSession(stripeCustomerId, sku)
    );

    if (sessionErr || !session) {
      throw new Error('Invalid session');
    }

    return { sessionId: session.id };
  },
  initiateRequest: async (parent, args, { user, prisma }) => {
    const { id } = args;

    const request = await prisma
      .createRequest({
        paper: { connect: { id } }
      })
      .$fragment(
        `
        fragment RequestWithPaper on Request {
          id
          paper {
            ${paperFragment}
          }
        }
      `
      );

    return request;
  }
};

module.exports = {
  Mutation
};

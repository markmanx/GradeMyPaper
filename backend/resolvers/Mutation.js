const {
  createStripeSession,
  getSku,
  createCustomer
} = require('../helpers/stripeHelper');
const { to } = require('../helpers/utils');
const { config } = require('../config');
const {
  requestWithPaperFragment
} = require('../fragments/requestWithPaperFragment');
const { getSignedUrl, getFileCount } = require('../helpers/fileUpload');

const Mutation = {
  createCheckoutSession: async (parent, args, { user, prisma }) => {
    const { requestId } = args;

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
        prisma.updateUser({
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
      createStripeSession(stripeCustomerId, sku, requestId)
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
      .$fragment(requestWithPaperFragment);

    return request;
  },
  generatePresignedUrl: async (parent, args, { user, prisma }) => {
    const { requestId } = args;

    const request = await prisma.request({ id: requestId });

    const fileCount = await getFileCount(requestId);

    const pageUpload = await prisma.createPageUpload({
      order: fileCount,
      request: { connect: { id: request.id } }
    });

    const url = await getSignedUrl(request.id, pageUpload.id);

    return url;
  }
};

module.exports = {
  Mutation
};

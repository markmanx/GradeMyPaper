const {
  createStripeSession,
  getSku,
  createCustomer,
  validateRequest
} = require('../helpers/stripeHelper/stripeHelper');
const { to } = require('../helpers/utils');
const { config } = require('../config');
const {
  requestWithPaperFragment
} = require('../fragments/requestWithPaperFragment');
const {
  getSignedUrl,
  getFileCount,
  getDownloadPresignedUrl
} = require('../helpers/fileUpload');

const Mutation = {
  createCheckoutSession: async (parent, args, ctx) => {
    const { requestId } = args;
    const { user, prisma } = ctx;

    const [validationErr, validRequest] = await to(
      validateRequest(prisma, {
        requestId
      })
    );

    if (validationErr) {
      throw new Error(validationErr);
    }

    let stripeCustomerId;

    if (!user.stripeCustomerId) {
      const [newCustomerErr, newCustomer] = await to(
        createCustomer(user.email)
      );

      if (newCustomerErr || !newCustomer) {
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
  initiateRequest: async (parent, args, ctx) => {
    const { id } = args;
    const { user, prisma } = ctx;

    const request = await prisma
      .createRequest({
        paper: { connect: { id } },
        user: { connect: { id: user.id } }
      })
      .$fragment(requestWithPaperFragment);

    return request;
  },
  generatePresignedUrl: async (parent, args, ctx) => {
    const { requestId } = args;
    const { user, prisma } = ctx;

    const requests = await prisma.requests({
      where: { id: requestId, user: { id: user.id } }
    });

    const request = requests[0] || null;

    if (!request) {
      throw new Error('Request not found');
    }

    const fileCount = await getFileCount(requestId);

    const pageUpload = await prisma.createPageUpload({
      order: fileCount,
      request: { connect: { id: request.id } }
    });

    const url = await getSignedUrl(request.id, pageUpload.id);

    return url;
  },
  getDownloadPresignedUrl: async (parent, args, ctx) => {
    const { requestId } = args;
    const { user, prisma } = ctx;

    const [feedbackErr, feedback] = await to(
      prisma.feedbacks({
        where: { request: { id: requestId, user: { id: user.id } } }
      })
    );

    if (feedbackErr || !feedback.length) {
      throw new Error('Cannot get feedback. Please contact us directly.');
    }

    const [urlErr, url] = await to(
      getDownloadPresignedUrl(requestId, feedback[0].filename)
    );

    if (urlErr) {
      throw new Error(
        'Could not generate a presigned url for this feedback.  Please contact us directly.'
      );
    }

    return url;
  }
};

module.exports = {
  Mutation
};

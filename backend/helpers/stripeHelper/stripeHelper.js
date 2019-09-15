const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
const { to } = require('../utils');

const getSku = sku => {
  return new Promise((resolve, reject) => {
    stripe.skus.retrieve(sku, { expand: ['product'] }, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};

const validateRequest = (prisma, { requestId }) => {
  return new Promise(async resolve => {
    const request = await prisma.request({ id: requestId }).$fragment(`
      id
      paymentRef
      paper {
        id
      }
      pageUploads {
        id
      }
    `);

    const exists = Boolean(request);
    const { pageUploads, paymentRef, paper } = request;

    resolve({
      exists,
      paymentAllowed: Boolean(
        exists && !paymentRef && pageUploads.length > 0 && paper.id
      )
    });
  });
};

const createStripeSession = (stripeCustomerId, sku, requestId) => {
  const { price, product, currency } = sku;

  return new Promise(async (resolve, reject) => {
    const [validationErr, validation] = await validateRequest();
    if (!validation.paymentAllowed) {
      reject('Request is invalid for payment');
      return;
    }

    stripe.checkout.sessions.create(
      {
        customer: stripeCustomerId,
        payment_method_types: ['card'],
        line_items: [
          {
            name: product.name,
            ...(product.description
              ? { description: product.description }
              : {}),
            images: product.images,
            amount: price,
            currency,
            quantity: 1
          }
        ],
        payment_intent_data: {
          description: `Payment intent for ${product.name}`,
          metadata: {
            requestId
          }
        },
        success_url: process.env.STRIPE_SUCCESS_REDIRECT,
        cancel_url: process.env.STRIPE_CANCEL_REDIRECT
      },
      (err, session) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(session);
      }
    );
  });
};

const validateStripeEvent = (body, sig) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SIGNING_SECRET
    );
  } catch (error) {
    return { error };
  }

  return { event };
};

const createCustomer = email => {
  return new Promise((resolve, reject) => {
    stripe.customers.create(
      {
        email
      },
      (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      }
    );
  });
};

const incrementUserCredits = (prisma, { userId }) => {
  return new Promise(async (resolve, reject) => {
    const user = await prisma.user({ id: userId });

    if (!user) {
      reject('User does not exist');
      return;
    }

    const [updatedUserErr] = await to(
      prisma.updateUser({
        data: { credits: user.credits + 1 },
        where: { id: user.id }
      })
    );

    if (updatedUserErr) {
      reject('Could not update user credits');
      return;
    }

    resolve();
  });
};

const markRequestAsPaid = (prisma, { requestId, stripeSessionId }) => {
  return new Promise(async (resolve, reject) => {
    const request = await prisma.request({ id: requestId });

    if (!request) {
      reject('Request does not exist');
      return;
    }

    if (request.paymentRef) {
      reject('Request already paid for');
      return;
    }

    const [err] = await to(
      prisma.updateRequest({
        where: { id: requestId },
        data: {
          paymentRef: stripeSessionId
        }
      })
    );

    if (err) {
      reject('Could not attach paymentRef to request');
      return;
    }

    resolve();
  });
};

const getUserByStripeId = (prisma, { stripeCustomerId }) => {
  return new Promise(async (resolve, reject) => {
    const [userMatchesErr, userMatches] = await to(
      prisma.users({ where: { stripeCustomerId } })
    );

    if (userMatchesErr || !userMatches.length) {
      reject('Could not retrieve user');
      return;
    }

    resolve(userMatches[0]);
  });
};

module.exports = {
  createStripeSession,
  validateStripeEvent,
  getSku,
  createCustomer,
  getUserByStripeId,
  incrementUserCredits,
  markRequestAsPaid,
  validateRequest
};

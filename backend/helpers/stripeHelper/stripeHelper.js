const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
const { to } = require('../utils');
const errorMessages = require('../../messages/errorMessages');

const getSku = (sku) => new Promise((resolve, reject) => {
  stripe.skus.retrieve(sku, { expand: ['product'] }, (err, data) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(data);
  });
});

const validateRequest = async (prisma, { requestId }) => {
  const request = await prisma.request({ id: requestId }).$fragment(`
    fragment RequestValidationParts on Request {
      id
      paymentRef
      paper {
        id
      }
      pageUploads {
        id
      }
    }
  `);

  return new Promise((resolve, reject) => {
    const { pageUploads, paymentRef } = request;

    if (!request) {
      reject(errorMessages.REQUEST_NOT_EXIST);
    }

    if (!pageUploads.length) {
      reject(errorMessages.NO_ANSWERSHEETS_UPLOADED);
    }

    if (paymentRef) {
      reject(errorMessages.PAYMENT_ALREADY_MADE);
    }

    resolve(request);
  });
};

const createStripeSession = (stripeCustomerId, sku, requestId) => {
  const { price, product, currency } = sku;

  return new Promise((resolve, reject) => {
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
            quantity: 1,
          },
        ],
        payment_intent_data: {
          description: `Payment intent for ${product.name}`,
          metadata: {
            requestId,
          },
        },
        success_url: process.env.STRIPE_SUCCESS_REDIRECT,
        cancel_url: process.env.STRIPE_CANCEL_REDIRECT,
      },
      (err, session) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(session);
      },
    );
  });
};

const validateStripeEvent = (body, sig) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SIGNING_SECRET,
    );
  } catch (error) {
    return { error };
  }

  return { event };
};

const createCustomer = (email) => new Promise((resolve, reject) => {
  stripe.customers.create(
    {
      email,
    },
    (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    },
  );
});

const incrementUserCredits = async (prisma, { userId }) => {
  const user = await prisma.user({ id: userId });

  if (!user) {
    throw new Error('User does not exist');
  }

  const [updatedUserErr] = await to(
    prisma.updateUser({
      data: { credits: user.credits + 1 },
      where: { id: user.id },
    }),
  );

  if (updatedUserErr) {
    throw new Error('Could not update user credits');
  }

  return null;
};

const markRequestAsPaid = async (prisma, { requestId, stripeSessionId }) => {
  const request = await prisma.request({ id: requestId });

  if (!request) {
    throw new Error('Request does not exist');
  }

  if (request.paymentRef) {
    throw new Error('Request already paid for');
  }

  const [err] = await to(
    prisma.updateRequest({
      where: { id: requestId },
      data: {
        paymentRef: stripeSessionId,
      },
    }),
  );

  if (err) {
    throw new Error('Could not attach paymentRef to request');
  }

  return null;
};

const getUserByStripeId = async (prisma, { stripeCustomerId }) => {
  const [userMatchesErr, userMatches] = await to(
    prisma.users({ where: { stripeCustomerId } }),
  );

  if (userMatchesErr || !userMatches.length) {
    throw new Error('Could not retrieve user');
  }

  return userMatches[0];
};

module.exports = {
  createStripeSession,
  validateStripeEvent,
  getSku,
  createCustomer,
  getUserByStripeId,
  incrementUserCredits,
  markRequestAsPaid,
  validateRequest,
};

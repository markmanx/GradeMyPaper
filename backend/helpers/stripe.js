const stripe = require('stripe')(process.env.STRIPE_API_SECRET);

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

const createStripeSession = (stripeCustomerId, sku) => {
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
            quantity: 1
          }
        ],
        payment_intent_data: {
          description: `Payment intent for ${product.name}`
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

module.exports = {
  createStripeSession,
  validateStripeEvent,
  getSku,
  createCustomer
};

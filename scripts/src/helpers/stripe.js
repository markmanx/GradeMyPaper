const stripe = require('stripe');

const updateWebhookEndpoint = (url, events, secret) => {
  const client = stripe(secret);

  return client.webhookEndpoints.create({
    url,
    enabled_events: events
  });
};

module.exports = {
  updateWebhookEndpoint
};

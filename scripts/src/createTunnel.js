const path = require('path');

const { connect } = require('./helpers/ngrok.js');
const { updateWebhookEndpoint } = require('./helpers/stripe');
const {
  upsertEnvVars,
  loadConfigFile,
  ENV_FILE_PATHS
} = require('./helpers/utils');

const config = loadConfigFile(path.join(__dirname, 'config.yml'));

const createTunnel = async () => {
  console.log('Creating ngrok tunnel');
  const url = await connect(config.backend.port);

  console.log('Updating stripe webhook endpoint');
  const webhook = await updateWebhookEndpoint(
    `${url}${config.stripe.webhook_path}`,
    config.stripe.allowed_webhook_events,
    config.stripe.api_secret
  );

  console.log('Updating webhook signing secret');
  await upsertEnvVars(
    {
      STRIPE_WEBHOOK_SIGNING_SECRET: webhook.secret
    },
    ENV_FILE_PATHS.backend
  );

  console.log(`Tunnel exposed at ${url}`);
};

createTunnel();

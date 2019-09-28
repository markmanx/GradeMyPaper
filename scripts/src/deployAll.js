const path = require('path');

const { deployAuth0 } = require('./deployAuth0');
const { deployStripe } = require('./deployStripe');
const { updateWebhookEndpoint } = require('./helpers/stripe');
const {
  upsertEnvVars,
  loadConfigFile,
  createEndpoint,
  ENV_FILE_PATHS
} = require('./helpers/utils');

const config = loadConfigFile(path.join(__dirname, 'config.yml'));

const deployAll = async () => {
  const { appName, frontend, auth0, stripe } = config;

  const frontendEndpoint = createEndpoint(frontend.baseUrl, frontend.port);

  await deployAuth0(appName, frontendEndpoint, auth0);
  await deployStripe(stripe.publishable_key, stripe.api_secret);

  //   console.log('Updating stripe webhook endpoint');
  //   const {
  //     backend: {
  //       baseUrl,
  //       port,
  //       stripe: { allowed_webhook_events, api_secret }
  //     }
  //   } = config;

  //   const webhookEndpoint = `
  //     ${baseUrl}
  //     ${port !== undefined ? `:${port}` : ''}
  //     ${config.stripe.webhook_path}
  //   `;

  //   const webhookData = await updateWebhookEndpoint(
  //     webhookEndpoint,
  //     allowed_webhook_events,
  //     api_secret
  //   );

  //   console.log('Updating webhook signing secret');
  //   await upsertEnvVars(
  //     {
  //       STRIPE_WEBHOOK_SIGNING_SECRET: webhookData.secret
  //     },
  //     ENV_FILE_PATHS.backend
  //   );

  // await deployStripe(config.stripe.publishable_key, config.stripe.api_secret);

  console.log('Updating frontend environment variables');
  await upsertEnvVars(
    {
      REACT_APP_BASE_URL: config.frontend.baseUrl,
      REACT_APP_GRAPHQL_ENDPOINT: `${config.baseUrl}:${config.apollo_server.port}/graphql`
    },
    ENV_FILE_PATHS.frontend
  );

  console.log('Updating backend environment variables');
  await upsertEnvVars(
    {
      APP_NAME: config.appName,
      PRISMA_PORT: config.prisma.port,
      PRISMA_ENDPOINT: `http://localhost:${config.prisma.port}`,
      PRISMA_MANAGEMENT_API_SECRET: config.prisma.management_secret,
      APOLLO_SERVER_PORT: config.apollo_server.port,
      STRIPE_SUCCESS_REDIRECT: config.stripe.success_redirect,
      STRIPE_CANCEL_REDIRECT: config.stripe.cancel_redirect
    },
    ENV_FILE_PATHS.backend
  );

  console.log('Finished');
};

deployAll();

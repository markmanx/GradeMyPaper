const { upsertEnvVars, ENV_FILE_PATHS } = require('./helpers/utils');

const updateEnvVars = async (publishableKey, apiSecret) => {
  await upsertEnvVars(
    {
      REACT_APP_STRIPE_PUBLISHABLE_KEY: publishableKey
    },
    ENV_FILE_PATHS.frontend
  );

  await upsertEnvVars(
    {
      STRIPE_API_SECRET: apiSecret
    },
    ENV_FILE_PATHS.backend
  );
};

const deployStripe = async (publishableKey, apiSecret) => {
  await updateEnvVars(publishableKey, apiSecret);
};

module.exports = {
  deployStripe
};

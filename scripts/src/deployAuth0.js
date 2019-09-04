const ManagementClient = require('auth0').ManagementClient;

const { updateAllowedUrls, getClientByName } = require('./helpers/auth0');
const { upsertEnvVars, ENV_FILE_PATHS } = require('./helpers/utils');

const setEnvVars = async (domain, client_id) => {
  try {
    await upsertEnvVars(
      {
        REACT_APP_AUTH0_DOMAIN: domain,
        REACT_APP_AUTH0_CLIENT_ID: client_id
      },
      ENV_FILE_PATHS.frontend
    );

    await upsertEnvVars(
      {
        AUTH0_DOMAIN: domain
      },
      ENV_FILE_PATHS.backend
    );
  } catch (err) {
    console.log(err);
  }
};

const deployAuth0 = async (appName, endpoint, auth0) => {
  try {
    const { domain, management_client_id, management_client_secret } = auth0;

    // Get access token
    console.log('Getting access token...');
    const management = await new ManagementClient({
      domain,
      clientId: management_client_id,
      clientSecret: management_client_secret
    });

    // Get client
    const clientName = appName;
    let client = await getClientByName(clientName, management);

    // Create the client if it doesn't exist
    if (!client) {
      console.log('Creating client...');
      client = await management.createClient({
        name: clientName,
        app_type: 'spa',
        jwt_configuration: {
          alg: 'RS256',
          lifetime_in_seconds: 36000
        },
        oidc_conformant: true
      });
    }

    // Update allowed urls on client
    console.log('Updating allowed urls on client');
    const { client_id } = client;
    await updateAllowedUrls(client_id, [endpoint], management);

    await setEnvVars(domain, client_id);
  } catch (error) {
    console.log(`Error deploying Auth0: ${error}`);
    return;
  }
};

module.exports = {
  deployAuth0
};

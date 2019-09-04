const updateAllowedUrls = async (clientId, allowedUrls, management) => {
  await management.updateClient(
    {
      client_id: clientId
    },
    {
      callbacks: allowedUrls,
      allowed_origins: allowedUrls,
      allowed_logout_urls: allowedUrls,
      web_origins: allowedUrls,
      allowed_clients: allowedUrls
    }
  );
};

const getClientByName = async (name, management) => {
  const clients = await management.getClients();

  return clients.find(client => client.name === name);
};

module.exports = {
  updateAllowedUrls,
  getClientByName
};

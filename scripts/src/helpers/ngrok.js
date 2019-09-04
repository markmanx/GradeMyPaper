const ngrok = require('ngrok');

const connect = async port => {
  const url = await ngrok.connect(port);
  return url;
};

module.exports = {
  connect
};

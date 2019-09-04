const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const ENV_FILE_PATHS = {
  frontend: path.join(__dirname, '../../../', 'frontend/.env'),
  backend: path.join(__dirname, '../../../', 'backend/.env')
};

const to = promise => {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err]);
};

const upsertEnvVars = (keyValPairs, filePath) => {
  let lines = [];

  if (fs.existsSync(filePath)) {
    lines = fs
      .readFileSync(filePath)
      .toString()
      .split('\n');
  }

  Object.keys(keyValPairs).forEach(key => {
    const matchIndex = lines.findIndex(
      line => line.substr(0, key.length + 1) === `${key}=`
    );

    const updatedLine = `${key}=${keyValPairs[key]}`;
    if (matchIndex !== -1) {
      lines[matchIndex] = updatedLine;
    } else {
      lines.push(updatedLine);
    }
  });

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, lines.join('\n'), { flag: 'w' }, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

const loadConfigFile = filePath => {
  return yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
};

const createEndpoint = (url, port, path) => {
  const portString = port === undefined || port === 80 ? '' : `:${port}`;
  return `${url}${portString}${path}`;
};

module.exports = {
  to,
  upsertEnvVars,
  loadConfigFile,
  createEndpoint,
  ENV_FILE_PATHS
};

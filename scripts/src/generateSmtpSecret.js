const crypto = require('crypto');
const path = require('path');
const utf8 = require('utf8');
const { loadConfigFile } = require('./helpers/utils');

const config = loadConfigFile(path.join(__dirname, 'config.yml'));

// Taken from https://docs.aws.amazon.com/ses/latest/DeveloperGuide/smtp-credentials.html

// Modify this variable to include your AWS Secret Access Key
const key = config.aws.accessSecret;

// Modify this variable to refer to the AWS Region that you want to use to send email.
const region = config.aws.sesSmtpRegion;

// The values of the following variables should always stay the same.
const date = '11111111';
const service = 'ses';
const terminal = 'aws4_request';
const message = 'SendRawEmail';
const versionInBytes = 0x04;

const hmacSha256 = (content, key) => {
  const hmac = crypto.createHmac('sha256', key);
  hmac.update(utf8.encode(content));
  return hmac.digest();
};

const kDate = hmacSha256(date, utf8.encode('AWS4' + key));
const kRegion = hmacSha256(region, kDate);
const kService = hmacSha256(service, kRegion);
const kTerminal = hmacSha256(terminal, kService);
const kMessage = hmacSha256(message, kTerminal);
const signatureAndVersion = Buffer.concat([
  Buffer.from([versionInBytes]),
  Buffer.from(kMessage, 'utf8')
]);
const smtpPassword = signatureAndVersion.toString('base64');

console.log(smtpPassword);

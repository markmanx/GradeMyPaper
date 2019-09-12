const S3 = require('aws-sdk/clients/s3');
const s3 = new S3({
  accessKeyId: 'AKIAZNPAHLOUW32CI3KX',
  secretAccessKey: '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',
  useAccelerateEndpoint: true
});

const params = { Bucket: 'grademypaper-s3-bucket' };

const getSignedUrl = key => {
  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', { ...params, Key: key }, (err, url) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(url);
    });
  });
};

module.exports = {
  getSignedUrl
};

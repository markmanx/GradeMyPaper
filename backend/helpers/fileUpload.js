const S3 = require('aws-sdk/clients/s3');
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET,
  region: process.env.AWS_S3_REGION
});

const params = {
  Bucket: 'grademypaper-s3-bucket',
  Expires: 120
};

const uploadsDir = 'uploads';

const getFileCount = requestId => {
  return new Promise((resolve, reject) => {
    s3.listObjectsV2(
      { Bucket: params.Bucket, Prefix: `${uploadsDir}/${requestId}` },
      (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data.KeyCount);
      }
    );
  });
};

const getSignedUrl = (requestId, key) => {
  return new Promise((resolve, reject) => {
    s3.getSignedUrl(
      'putObject',
      { ...params, Key: `${uploadsDir}/${requestId}/${key}` },
      (err, url) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(url);
      }
    );
  });
};

module.exports = {
  getSignedUrl,
  getFileCount
};

const S3 = require('aws-sdk/clients/s3');
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET,
  region: process.env.AWS_S3_REGION
});

const params = {
  Bucket: 'grademypaper-s3-bucket'
};

const getSignedUrl = key => {
  return new Promise((resolve, reject) => {
    s3.getSignedUrl(
      'putObject',
      { ...params, Key: `uploads/${key}`, Expires: 3600 },
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
  getSignedUrl
};

const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const request = require('request-promise-native');
const { AuthenticationError } = require('apollo-server-express');

const authenticationMiddleware = async (req, prisma) => {
  // get the user token from the headers
  const token =
    (req.headers.authorization &&
      req.headers.authorization.replace('Bearer ', '')) ||
    '';

  // try to retrieve a user with the token
  const decoded = jwt.decode(token, { complete: true });

  if (decoded !== null) {
    const kid = decoded.header.kid;

    let verified;

    try {
      const signingKey = await new Promise((resolve, reject) => {
        const jwks = jwksClient({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 10, // Default value
          jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
        });

        jwks.getSigningKey(kid, (err, key) => {
          if (err || !key) {
            reject();
            return;
          }
          resolve(key.publicKey || key.rsaPublicKey);
        });
      });

      verified = await new Promise((resolve, reject) => {
        jwt.verify(token, signingKey, (err, decoded) => {
          if (err || !decoded) {
            reject();
            return;
          }
          resolve(decoded);
        });
      });
    } catch (e) {
      throw new AuthenticationError('Not a valid token');
    }

    const { sub } = verified;

    let user = await prisma.user({
      auth0Id: sub
    });

    if (!user) {
      const userInfo = await new request.get({
        url: `https://${process.env.AUTH0_DOMAIN}/userinfo`,
        json: true,
        headers: { Authorization: req.headers.authorization }
      });

      user = await prisma.createUser({
        auth0Id: userInfo.sub,
        email: userInfo.email,
        credits: 0
      });
    }

    return { user, prisma };
  }

  return { user: null, prisma };
};

module.exports = {
  authenticationMiddleware
};

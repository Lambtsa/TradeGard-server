const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: process.env.OKTA_CLIENT_ID,
  issuer: `https://${process.env.OKTA_DOMAIN}/oauth2/default`,
  assertClaims: { cid: process.env.OKTA_CLIENT_ID },
});

const authenticationRequired = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
  if (!match) {
    // look over error handling
    res.status(401);
    return next('Unauthorized');
  }

  const accessToken = match[1];
  const audience = 'api://default';

  return oktaJwtVerifier.verifyAccessToken(accessToken, audience)
    .then(jwt => {
      req.jwt = jwt;
      next();
    })
    .catch(err => {
      // look over error handling
      res.status(401).send(err.message);
    });
};

module.exports = { authenticationRequired };

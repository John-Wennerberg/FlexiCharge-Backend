const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const config = require('../../config');

const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://cognito-idp.${config.AWS_REGION}.amazonaws.com/${config.USER_POOL}/.well-known/jwks.json`,
        // jwksUri: `https://dev-t3vri3ge.us.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    // audience: 'flexicharge.app',
    issuer: [`https://dev-t3vri3ge.us.auth0.com/`, `https://cognito-idp.eu-west-1.amazonaws.com/${config.USER_POOL}`],
    algorithms: ['RS256']
});


module.exports = checkJwt
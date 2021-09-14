const express = require('express');
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

let pems = {};

class AuthMiddleware {

    region = 'eu-west-1';
    userPoolId = 'eu-west-1_aSUDsld3S';

    constructor() {
        this.setUp();
    }

    verifyToken(req, res, next) {
        const token = req.header('Auth');

        if (!token) res.status(401).end();

        let decodeJwt = jwt.decode(token, { complete: true })
        if (!decodeJwt) {
            res.status(401).end()
        }

        let kid = decodeJwt.header.kid;
        let pem = pems[kid];
        if (!pem) {
            response.status(401).end();
        }

        jwt.verify(token, pem, (error, payload) => {
            if (error) {
                response.status(401).end()
            }
            // next()
        })
    }

    async setUp() {
        const URL = `https://cognito-idp.${this.region}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`

        try {
            const response = await fetch(URL);
            console.log(response);

            if (response.status !== 200) {
                throw 'request not successfull'
            }
            const data = await response.json();
            const { keys } = data;
            keys.forEach(key => {
                const key_id = key.kid
                const modulus = key.n;
                const exponent = key.e;
                const key_type = key.kty;
                const jwk = { kty: key_type, n: modulus, e: exponent };
                const pem = jwkToPem(jwk);
                pems[key_id] = pem
            });
            console.log('Got all pems.');

        } catch (error) {
            console.log(error);
            console.log('Could not fetch jwks.');

        }
    }

}

module.exports = AuthMiddleware
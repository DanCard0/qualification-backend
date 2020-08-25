'use strict';
const jwt = require('jwt-simple');
const moment = require('moment');

const CONFIG_VALUES = require('../config/config');

const createToken = user => {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };

    return jwt.encode(payload, CONFIG_VALUES.token_secret);
};

const decodeToken = token => {
    return new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, CONFIG_VALUES.token_secret);

            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                });
            }

            resolve(payload.sub);

        } catch (err) {
            reject({
                status: 500,
                message: 'Token no válido'
            });
        }
    });
}

module.exports = {
    createToken,
    decodeToken
};
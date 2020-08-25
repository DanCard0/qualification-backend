'use strict';
const services = require('../services');

const isAuthenticated = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No tienes autorización' });
    }

    const token = req.headers.authorization.split(' ')[1];
    
    services.decodeToken(token)
    .then(response => {
        req.user = response;
        next();
    }).catch(err => {
        res.status(err.status)
    })
};

module.exports = isAuthenticated;
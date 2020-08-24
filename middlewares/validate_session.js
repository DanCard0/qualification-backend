'use strict';
const User = require('../models/user');

module.exports = async (req, res, next) => {
    if (!req.session.user_id) {
        res.status(401).send({ message: 'Sesión no válida' });
    } else {
        try {
            let user = await User.findById(req.session.user_id);
            res.locals = { user };
            next();
        } catch (err) {
            console.error('Error en validate session: ', err);
            res.status(401).send({ message: 'Error validando la sesión' });
        }
    }
}
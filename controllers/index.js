'use strict';
const User = require('../models/user');

const login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, password: req.body.password });
        req.session.user_id = user._id;
        res.status(200).send({ message: 'Login exitoso' });
    } catch (err) {
        console.error('Error guardando usuario: ', err);
        res.status(500).send({ message: 'Error guardando el usuario' });
    }
};

module.exports = {
    login
};
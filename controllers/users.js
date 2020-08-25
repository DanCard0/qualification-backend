'use strict';
const User = require('../models/user');

const getUsers = async (req, res) => {
    try {
        let users = await User.find();

        res.status(200).send({ message: 'Usuarios obtenidos exitosamente', users });
    } catch (err) {
        console.error('Error obteniendo usuarios: ', err);
        res.status(500).send({ message: 'Error obteniendo usuarios' });
    }
};

module.exports = {
    getUsers
};
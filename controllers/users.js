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

const createUser = async (req, res) => {
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
        username: req.body.username
    });

    try {
        await newUser.save();
        res.status(200).send({ message: 'Usuario guardado exitosamente' });
    } catch (err) {
        console.error('Error guardando usuario: ', err);
        res.status(500).send({ message: 'Error guardando el usuario' });
    }
};

module.exports = {
    getUsers,
    createUser
};
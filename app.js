'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const User = require('./models/user');

mongoose.connect('mongodb://localhost/qualification');

app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.status(200).send({ message: 'Bienvenido al servicio Qualification' });
});

app.get('/user', async (req, res) => {
    try {
        let users = await User.find();
        console.log(users);

        res.status(200).send({ message: 'Usuarios obtenidos exitosamente', users });
    } catch (err) {
        console.error('Error obteniendo usuarios: ', err);
        res.status(500).send({ message: 'Error obteniendo usuarios' });
    }
});

app.post('/user', async (req, res) => {
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation
    });

    try {
        await newUser.save();
        res.status(200).send({ message: 'Usuario guardado exitosamente' });
    } catch (err) {
        console.error('Error guardando usuario: ', err);
        res.status(500).send({ message: 'Error guardando el usuario' });
    }
});

app.listen(8080);
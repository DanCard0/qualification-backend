'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const expressFormData = require('express-form-data');
const fs = require('fs');
const app = express();

const CONFIG_VALUES = require('./config/config');

const User = require('./models/user');

const validate_session = require('./middlewares/validate_session');

mongoose.connect(CONFIG_VALUES.mongoUrl);

const uploadsDir = __dirname + '/uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    if (!fs.existsSync(uploadsDir+'/images')) {
        fs.mkdirSync(uploadsDir+'/images');
    }
}

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    name: 'session',
    keys: ['llave-1', 'llave-2']
}));
app.use(expressFormData.parse({
    keepExtensions: true,
    // uploadDir: 'uploads'
}));

const router_app = require('./routes/app');

app.get('/', async (req, res) => {
    res.status(200).send({ message: 'Bienvenido al API de Qualification' });
});

app.get('/users', async (req, res) => {
    try {
        let users = await User.find();

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
});

app.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, password: req.body.password });
        req.session.user_id = user._id;
        res.status(200).send({ message: 'Login exitoso' });
    } catch (err) {
        console.error('Error guardando usuario: ', err);
        res.status(500).send({ message: 'Error guardando el usuario' });
    }
});

app.use('/app', validate_session);
app.use('/app', router_app);

app.listen(8080);
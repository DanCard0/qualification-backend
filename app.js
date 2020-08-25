'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const expressFormData = require('express-form-data');
const fs = require('fs');
const app = express();

const CONFIG_VALUES = require('./config/config');

const auth_validation = require('./middlewares/auth');

mongoose.connect(CONFIG_VALUES.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error conectando a la BD:'));
db.once('open', function() {
  console.log('Conexión exitosa a la BD');
});

const uploadsDir = __dirname + '/uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    if (!fs.existsSync(uploadsDir+'/images')) {
        fs.mkdirSync(uploadsDir+'/images');
    }
}

app.set('appName', 'Qualification Backend');
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({
    name: 'session',
    keys: ['llave-1', 'llave-2']
}));
app.use(expressFormData.parse({
    keepExtensions: true,
    // uploadDir: 'uploads'
}));

const router_index = require('./routes/index');
const router_users = require('./routes/users');
const router_images = require('./routes/images');

app.use('/imagenes', auth_validation);

const API_PREFIX = '/api/v1';

app.get('/', (req, res) => res.status(200).send({ message: 'Bienvenido al API de Qualification' }));
app.use(`${API_PREFIX}/`, router_index);
app.use(`${API_PREFIX}/usuarios`, router_users);
app.use(`${API_PREFIX}/imagenes`, router_images);

app.get('*', (req, res) => res.status(404).send({ message: 'Ruta no encontrada' }));
app.post('*', (req, res) => res.status(404).send({ message: 'Ruta no encontrada' }));

app.listen(CONFIG_VALUES.port, () => console.log(`Server ${app.get('appName')} escuchando en el puerto ${CONFIG_VALUES.port}`));

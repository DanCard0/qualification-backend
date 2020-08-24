'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const expressFormData = require('express-form-data');
const fs = require('fs');
const app = express();

const CONFIG_VALUES = require('./config/config');

const validate_session = require('./middlewares/validate_session');

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

app.use('/imagenes', validate_session);

app.use('/', router_index);
app.use('/usuarios', router_users);
app.use('/imagenes', router_images);

app.get('*', async (req, res) => {
    res.status(404).send({ message: 'Ruta no encontrada' });
});

app.listen(CONFIG_VALUES.port, () => console.log(`Server ${app.get('appName')} escuchando en el puerto ${CONFIG_VALUES.port}`));
'use strict';
const express = require('express');
let router = express.Router();

const indexCtrl = require('../controllers/index');

router.route('/')
.get(async (req, res) => {
    res.status(200).send({ message: 'Bienvenido al API de Qualification' });
});

router.route('/login')
.post(indexCtrl.login);

module.exports = router;
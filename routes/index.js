'use strict';
const express = require('express');
let router = express.Router();

const authCtrl = require('../controllers/auth');

router.route('/')
.get(async (req, res) => {
    res.status(200).send({ message: 'Bienvenido al API de Qualification' });
});

router.route('/login')
.post(authCtrl.signIn);

router.route('/registro')
.post(authCtrl.signUp)

module.exports = router;
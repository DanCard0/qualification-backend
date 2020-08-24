'use strict';
const express = require('express');
let router = express.Router();

router.route('/')
.get(async (req, res) => {
    res.status(200).send({ message: 'Bienvenido al API de Qualification' });
});

router.route('/login')
.post(async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, password: req.body.password });
        req.session.user_id = user._id;
        res.status(200).send({ message: 'Login exitoso' });
    } catch (err) {
        console.error('Error guardando usuario: ', err);
        res.status(500).send({ message: 'Error guardando el usuario' });
    }
});

module.exports = router;
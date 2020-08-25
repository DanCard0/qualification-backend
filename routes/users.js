'use strict';
const express = require('express');
let router = express.Router();

const userCtrl = require('../controllers/users');

router.route('/')
.get(userCtrl.getUsers)
.post(userCtrl.createUser);

module.exports = router;
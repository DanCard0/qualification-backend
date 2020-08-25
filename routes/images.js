'use strict';
const express = require('express');
let router = express.Router();

const imageCtrl = require('../controllers/images');

router.route('/:id')
.get(imageCtrl.getImage)
.put(imageCtrl.updateImage)
.delete(imageCtrl.deleteImage);

router.route('/')
.get(imageCtrl.getImages)
.post(imageCtrl.createImage);

module.exports = router;
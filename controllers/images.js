'use strict';
const Image = require('../models/image');

const fs = require('fs');

// const find_image_middleware = require('../middlewares/find_image');
// router.all('/imagenes/:id*', find_image_middleware);

const getImage = async (req, res) => {
    try {
        let image = await Image.findById(req.params.id);
        res.status(200).send({ message: 'Imagen obtenida exitosamente', image });
    } catch (err) {
        console.error('Error consultando la imagen: ', err);
        res.status(500).send({ message: 'Error consultando la imagen' });
    }
};

const updateImage = async (req, res) => {
    try {
        let image = await Image.findByIdAndUpdate(req.params.id, { title: req.body.title });
        console.log('\nUpdated Image: ', image, '\n');
        res.status(200).send({ message: 'Imagen actualizada exitosamente', image });
    } catch (err) {
        console.error('Error guardando imagen: ', err);
        res.status(500).send({ message: 'Error guardando imagen' });
    }
};

const deleteImage = async (req, res) => {
    try {
        await Image.findByIdAndRemove(req.params.id);
        res.status(200).send({ message: 'Imagen borrada exitosamente' });
    } catch (err) {
        console.error('Error borrando imagen: ', err);
        res.status(500).send({ message: 'Error borrando imagen' });
    }
};

const getImages = async (req, res) => {
    try {
        let images = await Image.find({ creator: req.user });
        res.status(200).send({ message: 'Imagenes obtenidas exitosamente', images });
    } catch (err) {
        console.error('Error consultando las imágenes: ', err);
        res.status(500).send({ message: 'Error consultando las imágenes' });
    }
};

const createImage = async (req, res) => {
    let extension = req.files.attachment.name.split('.').pop();
    let image = new Image({
        title: req.body.title,
        creator: req.user,
        extension
    });

    try {
        let savedImage = await image.save();
        console.log('\nreq.files.attachment.path: ', req.files.attachment.path);
        console.log('final path: ', `uploads/images/${savedImage._id}.${extension}`);
        fs.rename(req.files.attachment.path, `uploads/images/${savedImage._id}.${extension}`);
        res.status(200).send({ message: 'Imagen guardada exitosamente', image_id: image._id });
    } catch (err) {
        console.error('Error guardando imagen: ', err);
        res.status(500).send({ message: 'Error guardando imagen' });
    }
};

module.exports = {
    getImage,
    updateImage,
    deleteImage,
    getImages,
    createImage
};
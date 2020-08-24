const Image = require('../models/image');

module.exports = async (req, res, next) => {
    try {
        let image = await Image.findById(req.params.id);
        if (!!image) {
            res.locals.image = image;
            next();
        } else {
            res.status(404).send({ message: 'No se encontró la imagen solicitada' });
        }
    } catch (err) {
        console.error('Error encontrando la imagen: ', err);
        res.status(500).send({ message: 'Error encontrando la imagen' });
    }
}
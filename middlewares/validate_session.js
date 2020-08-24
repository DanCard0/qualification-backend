module.exports = (req, res, next) => {
    if (!req.session.user_id) {
        res.status(401).send({ message: 'Sesión no válida' });
    } else {
        next();
    }
}
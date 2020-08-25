'use strict';
const User = require('../models/user');

const service = require('../services');

const signUp = async (req, res) => {
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation
    });

    user.avatar = user.gravatar();

    try {
        await user.save();
        res.status(200).send({ message: 'Usuario creado exitosamente', token: service.createToken(user) });
    } catch (err) {
        console.error('Error guardando usuario: ', err);
        res.status(500).send({ message: 'Error guardando usuario' });
    }
};

const signIn = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email }, '_id email +password');
        if (!user) return res.status(404).send({ message: `No se encontró el usuario ${req.body.email}` });

        return user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparando passwords: ', err);
                return res.status(500).send({ msg: `Ha habido un error al ingresar` });
            }
            if (!isMatch) return res.status(404).send({ msg: `La contraseña no es válida` });
            
            req.user = user;
            return res.status(200).send({ msg: 'Login exitoso', token: service.createToken(user) });
        });
    
    } catch (err) {
        console.error('Error en el login: ', err);
        res.status(500).send({ message: 'Error iniciando sesión' });
    }
};

module.exports = {
    signUp,
    signIn
}
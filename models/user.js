'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const passw_validation = {
    validator: function(val) {
        return this.password_confirmation == p;
    },
    message: 'Las contraseñas no son iguales'
};

const user_schema = new Schema({
    first_name: String,
    last_name: String,
    avatar: String,
    date_of_birth: Date,
    last_login: Date,
    username: {
        type: String,
        required: true,
        maxlength: [50, 'Username muy extenso']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: 'El correo es obligatorio',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'El correo no es válido']
    },
    password: {
        type: String,
        select: false,
        minlength: [8, 'Contraseña muy corta'],
        validate: passw_validation
    },
    age: {
        type: Number,
        min: [5, 'La edad no puede ser menor a 5'],
        max: [100, 'La edad no puede ser mayor a 100']
    },
    gender: {
        type: String,
        enum: { values: ['M', 'F'], message: 'La opción ingresada no es válida' }
    },
    creation_date: {
        type: Date,
        default: Date.now()
    }
});

user_schema.virtual('password_confirmation').get(() => {
    return this.p_c;
}).set((password) => {
    this.p_c = password;
});

user_schema.pre('save', (next) => {
    let user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        })
    })
});

user_schema.methods.gravatar = function () {
    if (!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro';

    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
}

module.exports = mongoose.model('User', user_schema);

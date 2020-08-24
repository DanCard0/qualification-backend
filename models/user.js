'use strict';
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const passwValidation = {
    validator: function(val) {
        return this.password_confirmation == p;
    },
    message: 'Las contraseñas no son iguales'
};

let user_schema = new Schema({
    first_name: String,
    last_name: String,
    username: {
        type: String,
        required: true,
        maxlength: [50, 'Username muy extenso']
    },
    email: {
        type: String,
        required: 'El correo es obligatorio',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'El correo no es válido']
    },
    password: {
        type: String,
        minlength: [8, 'Contraseña muy corta'],
        validate: passwValidation
    },
    age: {
        type: Number,
        min: [5, 'La edad no puede ser menor a 5'],
        max: [100, 'La edad no puede ser mayor a 100']
    },
    date_of_birth: Date,
    gender: {
        type: String,
        enum: { values: ['M', 'F'], message: 'La opción ingresada no es válida' }
    }
});

user_schema.virtual('password_confirmation').get(() => {
    return this.p_c;
}).set((password) => {
    this.p_c = password;
});

module.exports = mongoose.model('User', user_schema);

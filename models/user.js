const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_schema = new Schema({
    first_name: String,
    last_name: String,
    username: String,
    email: String,
    password: String,
    age: Number,
    date_of_birth: Date
});

user_schema.virtual('password_confirmation').get(() => {
    return this.p_c;
}).set((password) => {
    this.p_c = password;
});

module.exports = mongoose.model('User', user_schema);

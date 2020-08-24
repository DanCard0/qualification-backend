'use strict';
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let image_schema = new Schema({
    title: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    extension: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Image', image_schema);

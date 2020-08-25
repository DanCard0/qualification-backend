'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const image_schema = new Schema({
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

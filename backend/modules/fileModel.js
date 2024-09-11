// fileModel.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    path: { type: String, required: true },
    filename: { type: String, required: true }
});

const ImageModel = mongoose.model('images', fileSchema);
module.exports = { ImageModel }
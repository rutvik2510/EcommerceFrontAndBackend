// fileController.js
const mongoose = require("mongoose");
const { ImageModel } = require("../modules/fileModel");

async function upload1(req, res) {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }


    try {
        const { path, filename } = req.file;
        const image = new ImageModel({ path, filename });
        await image.save();

        const imageUrl = `http://localhost:5000/api/file/upload/${filename}`;
        res.send({ "msg": "Image Uploaded Successfully!", imageUrl });

    } catch (err) {
        res.status(500).send(err, { "error": "unable to puload image" });
    }
};

async function download(req, res) {
    try {
        const file = await ImageModel.findById(req.params.id); // Changed to find by ID

        if (!file) {
            return res.status(404).send("File Not Found");
        }

        res.set({
            'Content-Type': file.mimetype,
            'Content-Disposition': `attachment; filename="${file.originalname}"`
        });

        res.send(file.buffer);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    upload1,
    download,
};
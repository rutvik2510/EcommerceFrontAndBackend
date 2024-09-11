const express = require('express');
const router = express.Router();
const { upload1, download } = require("../controllers/filecontroller");
const multer = require("multer");
//const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + path.extname(file.originalname))
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({ storage, fileFilter });


router.post("/upload", upload.single("image"), upload1);

router.get("/download", download);

module.exports = router;
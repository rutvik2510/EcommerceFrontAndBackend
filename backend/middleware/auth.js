// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/userModel');


const authorise = async(req, res, next) => {
    const token = req.header('Authorization');
    const BearerWord = (token.split(" ")[0]).trim();
    const BearerToken = token.split(" ")[1];

    if (BearerWord !== "Bearer") {
        return res.status(403).json({ message: "Invalid Header" });
    }
    if (!BearerToken) {
        return res.status(401).json({ message: "No Token, Authorization denied" });
    }
    try {
        const decoded = jwt.verify(BearerToken, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Token is not valid' });
    }
};

module.exports = authorise;
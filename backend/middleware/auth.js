const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../modules/userModel');

const authorise = async(req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: "No Token, Authorization denied" });
    }

    const [BearerWord, BearerToken] = token.split(" ");

    if (BearerWord !== "Bearer") {
        return res.status(403).json({ message: "Invalid Header" });
    }

    if (!BearerToken) {
        return res.status(401).json({ message: "No Token, Authorization denied" });
    }

    try {
        const decoded = jwt.verify(BearerToken, process.env.JWT_SECRET);
        console.log('Decoded JWT:', decoded); // Add this log to inspect the decoded token

        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message); // Add error message logging
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = authorise;
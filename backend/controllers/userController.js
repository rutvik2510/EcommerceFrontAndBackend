// const User = require('../models/userModel');
// const jwt = require('jsonwebtoken');

// function generateToken(user) {
//     return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
// }

// async function registerUser(req, res) {
//     try {
//         const user = new User(req.body);
//         await user.save();
//         console.log(user);
//         res.status(201).send({ msg: "successfull registered" });

//     } catch (error) {
//         res.status(400).send(error);
//     }
// };

// async function loginUser(req, res) {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user || !(await user.comparePassword(password))) {
//             return res.status(400).send({ error: 'Invalid login credentials' });
//         }
//         const token = generateToken(user);
//         res.status(200).send({ user, token, msg: "login successfully" });

//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

// module.exports = {
//     registerUser,
//     loginUser
// }

// backend/controllers/userController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

function generateToken(user) {
    return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

async function registerUser(req, res) {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send({ msg: "Successfully registered" });
    } catch (error) {
        res.status(400).send(error);
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }
        const token = generateToken(user);
        res.status(200).send({ user, token, msg: "Login successful" });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    registerUser,
    loginUser,

};
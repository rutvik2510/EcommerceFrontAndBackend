const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const authorise = require('../middleware/auth');
const User = require('../modules/userModel');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authorise, async(req, res) => {
    try {
        console.log('User ID from token:', req.user); // Log the user ID
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        console.error('Error fetching user profile:', error); // Log the error
        res.status(500).send({ message: 'Server error' });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

//verify OTP route
router.post('/verify-otp', authController.verifyOTP);

module.exports = router;

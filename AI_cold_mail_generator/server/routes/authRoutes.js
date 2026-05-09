import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

//verify OTP route
router.post('/verify-otp', authController.verifyOTP);

export default router;

const User = require('../models/User');
const sendEmail = require('../utils/emailService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token; 
}


exports.register = async (req, res) => {
   try {
        console.log('Register called with body:', req.body);
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
          return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate username
        if (username.length < 3 || username.length > 30) {
          return res.status(400).json({ error: 'Username must be between 3 and 30 characters' });
        }

        if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
          return res.status(400).json({ error: 'Username can only contain letters, numbers, underscores, and hyphens' });
        }

        //check password length
        if (password.length < 6) {
          return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        //check password strength
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(password)) {
          return res.status(400).json({ error: 'Password must contain at least one letter and one number' });
        }

        //check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ error: 'Invalid email format' });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
          return res.status(400).json({ error: 'Username already taken' });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        //OTP generation
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

        // Create and save user to database
        const user = await User.create({ username, email, password: hashedPassword, otp, otpExpiry });

        //send OTP to user's email
        try {
          await sendEmail({
            to: email,
            subject: 'OTP Verification for AI Cold mail App',
            text: `Your OTP is: ${otp}. This OTP will expire in 10 minutes.`,
          });
        } catch (emailError) {
          console.error('Email send error:', emailError);
          // Continue even if email fails - OTP is still saved
        }

        res.status(201).json({ message: 'User registered successfully. Please check your email for OTP.' });

   } catch (error) {
     console.error('Register error:', error);
     res.status(500).json({ error: 'Internal server error', details: error.message });
   }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({ error: 'User is not verified. Please verify your email first.' });
    }

    // Compare password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate OTP format (should be 6 digits)
    if (!/^\d{6}$/.test(String(otp).trim())) {
      return res.status(400).json({ error: 'OTP must be 6 digits' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if OTP has expired
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }

    // Convert OTP to string for comparison
    const otpString = String(otp).trim();

    // Check if OTP matches
    if (user.otp !== otpString) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Mark user as verified and clear OTP
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    
    const token = generateToken(user._id);
    res.status(200).json({ token, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

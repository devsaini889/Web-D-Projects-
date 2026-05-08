const User = require('../models/User');
const sendEmail = require('../utils/emailService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

exports.register = async (req, res) => {
  try {
    console.log('Register called with body:', req.body);
    const { username, email, password } = req.body;

    // 1. Validation Logic
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (username.length < 3 || username.length > 30) {
      return res.status(400).json({ error: 'Username must be between 3 and 30 characters' });
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return res.status(400).json({ error: 'Username can only contain letters, numbers, underscores, and hyphens' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: 'Password must contain at least one letter and one number' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // 2. Duplicate Checks
    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).json({ error: 'Username already taken' });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already registered' });

    // 3. Security & OTP Generation
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    // 4. Create User
    const user = await User.create({ username, email, password: hashedPassword, otp, otpExpiry });

    // 5. Send Witty OTP Email (Option 1)
    try {
      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: #2563eb; margin-bottom: 0;">MailGen AI</h2>
                <div style="height: 2px; width: 40px; background: #2563eb; margin: 8px auto;"></div>
            </div>
            <h3 style="color: #1e293b; text-align: center;">Almost there, ${username}!</h3>
            <p style="color: #475569; line-height: 1.6; text-align: center;">
                My AI brain is warmed up and ready to write your emails, but first, I need to make sure you aren't a rival robot trying to steal my secrets. (Or just a very talented toaster).
            </p>
            <div style="background: #f8fafc; padding: 30px; text-align: center; border-radius: 12px; margin: 25px 0; border: 1px inset #f1f5f9;">
                <span style="font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Your Verification Code</span>
                <h1 style="font-size: 48px; margin: 15px 0; color: #1e293b; letter-spacing: 10px;">${otp}</h1>
            </div>
            <p style="font-size: 13px; color: #64748b; text-align: center;">
                This code expires in 10 minutes. After that, I'll go back to calculating the meaning of life (spoiler: it's 42).
            </p>
        </div>
      `;

      // Inside exports.register...
      await sendEmail({
        to: email,
        subject: '🤖 Your human-verification code is here!',
        text: `Your OTP is ${otp}`, // Fallback for old email clients
        html: emailHtml, // This is where the funny message lives
      });
    } catch (emailError) {
      console.error('Email send error:', emailError);
      // We don't return here so the user is still created, but you might want to inform the frontend
    }

    // 6. Return Data (Crucial for Frontend Navigation)
    res.status(201).json({
      message: 'User registered successfully.',
      userId: user._id,
      email: user.email
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    if (!user.isVerified) {
      return res.status(401).json({
        error: 'User is not verified.',
        isNotVerified: true, // Frontend can use this to redirect to OTP
        email: user.email,
        userId: user._id
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid email or password' });

    const token = generateToken(user._id);
    res.status(200).json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { userId, email, otp } = req.body; // Accept either userId or email

    if ((!userId && !email) || !otp) {
      return res.status(400).json({ error: 'Identification and OTP are required' });
    }

    // Find user by ID (preferred) or Email
    const query = userId ? { _id: userId } : { email: email.toLowerCase() };
    const user = await User.findOne(query);

    if (!user) return res.status(404).json({ error: 'User not found' });

    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ error: 'OTP has expired.' });
    }

    if (user.otp !== String(otp).trim()) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = generateToken(user._id);
    res.status(200).json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
      message: 'OTP verified successfully'
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
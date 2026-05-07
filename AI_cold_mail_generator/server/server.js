//Env variables - LOAD FIRST
require('dotenv').config();

const express = require('express')
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes')
const aiRoutes = require('./routes/aiRoutes')

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// Simple error handler
app.use((err, req, res, next) => {
  console.error('===== ERROR =====');
  console.error('Message:', err.message);
  console.error('Stack:', err.stack);
  console.error('=================');
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

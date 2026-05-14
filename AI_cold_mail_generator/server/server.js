// 1. LOAD ENV FIRST - Must be the very first import
import 'dotenv/config'; 

import express from 'express';
import { connectDB } from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

// 2. Constants
const PORT = process.env.PORT || 3000;

// 3. Connect to MongoDB
connectDB();

const app = express();

// 4. Middleware - Dynamic CORS Configuration
// This list includes your specific Render frontend URL that was causing the error
const allowedOrigins = [
  'http://localhost:5173',                   // Local Vite Development
  'https://mailgen.me',                      // Your Custom Domain
  'https://www.mailgen.me',                  // Custom Domain (www)
  'https://web-d-projects-1mn4.onrender.com', // Your specific Render Frontend
  /\.onrender\.com$/                          // Matches any other Render subdomains
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.some((allowed) => {
      if (allowed instanceof RegExp) return allowed.test(origin);
      return allowed === origin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      // Logging the blocked origin helps with debugging
      console.error(`CORS Blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// 6. Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('===== SERVER ERROR =====');
  console.error('Message:', err.message);
  if (process.env.NODE_ENV !== 'production') {
    console.error('Stack:', err.stack);
  }
  console.error('========================');
  
  res.status(500).json({ 
    error: 'Internal server error', 
    details: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong' 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
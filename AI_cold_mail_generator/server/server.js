// 1. LOAD ENV FIRST - This must be the very first import
import 'dotenv/config'; 

import express from 'express';
import { connectDB } from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

// 2. Constants
const PORT = process.env.PORT || 3000;

// 3. Connect to MongoDB
// This will now have access to process.env.MONGO_URI
connectDB();

const app = express();

// 4. Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL 
    : 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// 6. Error Handling
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

export default app;
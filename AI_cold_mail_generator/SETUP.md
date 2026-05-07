# Development Setup Guide

This guide will help you set up the AI Cold Mail Generator project for development.

## Quick Start

### 1. Prerequisites Installation

Make sure you have the following installed:
- **Node.js** v16 or higher - [Download](https://nodejs.org)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com)

Verify installation:
```bash
node --version
npm --version
git --version
```

### 2. Clone & Initial Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd AI_cold_mail_generator

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

cd ..
```

### 3. Environment Configuration

#### 3.1 Backend Setup

Navigate to `server/` directory:

```bash
cp .env.example .env
```

Edit `server/.env` and add your credentials:

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ai_cold_mail_db

# JWT
JWT_SECRET=your-random-secret-key-at-least-32-characters-long

# Gmail Configuration
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password

# Groq API
GROQ_API_KEY=your-groq-api-key

# Server
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**Getting Gmail App Password:**
1. Go to [Google Account](https://myaccount.google.com/)
2. Navigate to **Security** > **2-Step Verification** (enable if needed)
3. Look for **App passwords** section
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character password

**Getting Groq API Key:**
1. Visit [Groq Console](https://console.groq.com)
2. Sign up/login to your account
3. Navigate to API Keys section
4. Create and copy your API key

#### 3.2 Frontend Setup

Navigate to `client/` directory:

```bash
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_NODE_ENV=development
```

### 4. Database Setup

#### MongoDB Atlas Setup:

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier is fine for development)
3. Create a database user with read/write permissions
4. Whitelist your IP address (or 0.0.0.0 for development)
5. Click "Connect" and copy the connection string
6. Replace `<username>`, `<password>`, and `<database_name>` in your `.env`

Connection string format:
```
mongodb+srv://username:password@cluster-name.mongodb.net/database_name
```

### 5. Running the Application

You'll need **two terminal windows** or use a terminal multiplexer.

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```

Expected output:
```
Connected to MongoDB
Server is running on port 3000
```

**Terminal 2 - Frontend Development:**
```bash
cd client
npm run dev
```

Expected output:
```
VITE v8.0.10  ready in 123 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

Visit `http://localhost:5173` in your browser.

## Troubleshooting

### MongoDB Connection Error
- **Error:** `MongooseError: connect ECONNREFUSED`
- **Solution:**
  - Verify MongoDB URI in `.env`
  - Check if IP is whitelisted in MongoDB Atlas
  - Ensure internet connection is active

### Email Not Sending
- **Error:** `Invalid login: 535-5.7.8 Username and Password not accepted`
- **Solution:**
  - Verify 2-Step Verification is enabled on Gmail
  - Use App Password (not regular Gmail password)
  - Confirm `EMAIL_USERNAME` and `EMAIL_PASSWORD` are correct

### CORS Error
- **Error:** `Access to XMLHttpRequest blocked by CORS policy`
- **Solution:**
  - Ensure backend is running on port 3000
  - Verify `CLIENT_URL` in server `.env` matches frontend URL
  - Frontend should be on `http://localhost:5173`

### Port Already in Use
- **Error:** `Error: listen EADDRINUSE: address already in use :::3000`
- **Solution:**
  ```bash
  # On Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  
  # On Mac/Linux
  lsof -i :3000
  kill -9 <PID>
  ```

### Groq API Error
- **Error:** `401 Unauthorized` or `Invalid API key`
- **Solution:**
  - Verify `GROQ_API_KEY` is set correctly in `.env`
  - Check key is valid at [Groq Console](https://console.groq.com)
  - Ensure key hasn't been regenerated/revoked

## Project Structure

```
AI_cold_mail_generator/
├── server/                 # Backend (Express + MongoDB)
│   ├── config/            # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Custom middleware
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── utils/             # Helper utilities
│   ├── server.js          # Entry point
│   ├── package.json
│   └── .env.example
│
├── client/                # Frontend (React + Vite)
│   ├── src/
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Global styles
│   ├── public/            # Static assets
│   ├── package.json
│   ├── vite.config.js     # Vite configuration
│   └── .env.example
│
├── README.md              # Project documentation
├── LICENSE
└── .gitignore
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/verify-otp` - Verify OTP and get JWT
- `POST /api/auth/login` - Login with credentials

### AI Features
- `POST /api/ai/generate` - Generate emails (requires auth)
- `GET /api/ai/history` - Get email generation history (requires auth)

## Development Commands

### Backend
```bash
cd server

npm start        # Production mode
npm run dev      # Development with auto-reload
npm test         # Run tests (when available)
```

### Frontend
```bash
cd client

npm run dev      # Development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Best Practices

1. **Environment Variables:**
   - Never commit `.env` files
   - Use `.env.example` for template
   - Keep sensitive keys secure

2. **Git Commits:**
   ```bash
   git add .
   git commit -m "Descriptive message"
   git push origin main
   ```

3. **Testing API:**
   - Use Postman or VS Code Thunder Client
   - Set Authorization header: `Bearer <token>`
   - Include Content-Type: `application/json`

4. **Debugging:**
   - Check browser DevTools console
   - Check server terminal for errors
   - Review `.env` configuration

## Next Steps

1. **Set up frontend pages:**
   - Login page
   - Register page
   - Email generator page
   - Email history page

2. **Implement features:**
   - User profile management
   - Email customization options
   - Export/download emails

3. **Testing:**
   - Unit tests for controllers
   - Integration tests for API
   - E2E tests for user flows

4. **Deployment:**
   - Prepare for production build
   - Set up CI/CD pipeline
   - Deploy to hosting platform

## Support

For issues or questions:
1. Check the README.md for detailed documentation
2. Review error messages and logs
3. Check troubleshooting section above
4. Create an issue on GitHub

## Resources

- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com)
- [React Documentation](https://react.dev)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Vite Documentation](https://vitejs.dev)
- [Groq Documentation](https://console.groq.com/docs)

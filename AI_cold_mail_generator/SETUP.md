# Development Setup Guide

Complete step-by-step guide to set up the AI Cold Mail Generator project for local development.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Detailed Setup](#detailed-setup)
4. [Environment Variables](#environment-variables)
5. [Database Setup](#database-setup)
6. [API Keys Setup](#api-keys-setup)
7. [Running the Application](#running-the-application)
8. [Troubleshooting](#troubleshooting)
9. [Development Tips](#development-tips)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** v14+ - [Download](https://nodejs.org)
- **npm** v6+ or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com)
- **Git configured** with your GitHub credentials

### Verify Installation

Run these commands in your terminal:

```bash
node --version      # Should be v14 or higher
npm --version       # Should be v6 or higher
git --version       # Should show a version
```

### Create Required Accounts

1. **MongoDB Atlas** - [Create Free Cluster](https://www.mongodb.com/cloud/atlas)
2. **Gmail Account** - [Sign up](https://accounts.google.com/SignUp)
3. **Groq API** - [Get Free API Key](https://console.groq.com)

## Quick Start

For experienced developers, here's the quick setup:

```bash
# Clone and navigate
git clone https://github.com/yourusername/ai-cold-mail-generator.git
cd ai-cold-mail-generator

# Install all dependencies at once
npm run setup

# Configure environment
cp server/.env.example server/.env
cp client/.env.example client/.env

# Edit .env files with your credentials
# Then start development
npm run dev
```

## Detailed Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/ai-cold-mail-generator.git
cd ai-cold-mail-generator
```

### Step 2: Install Dependencies

There are three ways to install dependencies:

**Option A: All at once (recommended)**
```bash
npm run setup
```

**Option B: Manually**
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..

# Install client dependencies
cd client
npm install
cd ..
```

**Option C: Individually**
```bash
npm install --prefix server
npm install --prefix client
```

### Step 3: Environment Configuration

#### Backend Configuration

Navigate to `server/` directory:

```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your values:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai_cold_mail_db

# JWT Secret (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your_random_32_character_string_here

# Gmail Configuration (for OTP emails)
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your_16_character_app_password

# Groq API (for AI email generation)
GROQ_API_KEY=your_groq_api_key_here

# Server Configuration
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

#### Frontend Configuration

Navigate to `client/` directory:

```bash
cd ../client
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_NODE_ENV=development
```

## Environment Variables

### Server Variables Explained

| Variable | Purpose | Format | Example |
|----------|---------|--------|---------|
| `MONGODB_URI` | Database connection | MongoDB Atlas URI | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Token signing key | Random 32+ characters | Use `crypto.randomBytes(32).toString('hex')` |
| `EMAIL_USERNAME` | Sender email | Gmail address | `your-email@gmail.com` |
| `EMAIL_PASSWORD` | Gmail app password | 16-char app password | From Gmail app passwords |
| `GROQ_API_KEY` | Groq API key | API key string | From Groq console |
| `PORT` | Server port | Number | `3000` |
| `NODE_ENV` | Environment | `development` or `production` | `development` |
| `CLIENT_URL` | Frontend URL | Full URL | `http://localhost:5173` |

### Client Variables Explained

| Variable | Purpose | Format | Example |
|----------|---------|--------|---------|
| `VITE_API_BASE_URL` | Backend API URL | Full API URL | `http://localhost:3000/api` |
| `VITE_NODE_ENV` | Environment | `development` or `production` | `development` |

## Database Setup

### MongoDB Atlas Setup (Recommended for Development)

1. **Create Account**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up with email
   - Verify your email address

2. **Create Cluster**
   - Click "Create a Deployment"
   - Choose "Shared" (Free tier)
   - Select your region
   - Click "Create Deployment"
   - Wait for cluster to provision (3-5 minutes)

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and strong password
   - Grant "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access"
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add only your server IP
   - Click "Confirm"

5. **Get Connection String**
   - Go back to "Databases"
   - Click "Connect" button
   - Choose "Drivers"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and `<database>`
   - Paste in `server/.env` as `MONGODB_URI`

Example connection string:
```
mongodb+srv://myuser:mypassword@cluster0.mongodb.net/ai_cold_mail_db
```

## API Keys Setup

### Gmail App Password Setup

1. **Enable 2-Step Verification**
   - Go to [Google Account](https://myaccount.google.com/)
   - Click "Security" in left menu
   - Find "2-Step Verification"
   - Click "Get Started"
   - Follow the steps to enable it

2. **Generate App Password**
   - Go back to [Google Account Security](https://myaccount.google.com/security)
   - Find "App passwords"
   - Select "Mail" and "Windows Computer"
   - Click "Generate"
   - Copy the 16-character password
   - Add to `server/.env` as `EMAIL_PASSWORD`

### Groq API Key Setup

1. **Create Groq Account**
   - Visit [Groq Console](https://console.groq.com)
   - Sign up with email or GitHub
   - Verify email

2. **Get API Key**
   - Go to "API Keys" section
   - Click "Create New API Key"
   - Name it something like "Development"
   - Copy the key
   - Add to `server/.env` as `GROQ_API_KEY`

3. **Test the Key**
   - Keep your terminal open
   - Run the app and try generating an email
   - If it fails, check the key is valid

## Running the Application

### Option 1: Concurrently (Recommended)

From the root directory:

```bash
npm run dev
```

This starts both backend and frontend in one command.

**Expected Output:**
```
[SERVER] Connected to MongoDB
[SERVER] Server is running on port 3000
[CLIENT] ➜  Local:   http://localhost:5173/
```

### Option 2: Separate Terminals

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Docs**: Check your routes in `server/routes/`

## Project Structure

```
ai-cold-mail-generator/
├── client/                          # React Frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard.jsx        # Main app page
│   │   │   ├── LandingPage.jsx      # Home page
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── VerifyOtp.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Auth state management
│   │   ├── utils/
│   │   │   └── api.js               # API calls
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Global styles
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js               # Vite configuration
│
├── server/                          # Express Backend
│   ├── config/
│   │   └── db.js                    # Database connection
│   ├── controllers/
│   │   ├── authController.js        # Auth logic
│   │   └── aiController.js          # AI email logic
│   ├── middlewares/
│   │   └── authmiddleware.js        # JWT verification
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   └── emailHistory.js          # Email history schema
│   ├── routes/
│   │   ├── authRoutes.js            # Auth endpoints
│   │   └── aiRoutes.js              # AI endpoints
│   ├── utils/
│   │   └── emailService.js          # Email sending utility
│   ├── .env.example
│   ├── server.js                    # Server entry point
│   └── package.json
│
├── .gitignore                       # Git ignore rules
├── package.json                     # Root dependencies
├── README.md                        # Main documentation
├── SETUP.md                         # This file
├── CONTRIBUTING.md                  # Contributing guidelines
├── DEPLOYMENT_CHECKLIST.md          # Pre-deployment checks
├── TROUBLESHOOTING.md               # Common issues
├── GITHUB_READY_SUMMARY.md          # GitHub prep summary
└── LICENSE                          # ISC License
```

## Troubleshooting

### MongoDB Connection Error

**Symptoms:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
MongooseError: connect ECONNREFUSED
```

**Solutions:**
1. Verify `MONGODB_URI` is correct in `server/.env`
2. Check if IP is whitelisted in MongoDB Atlas
3. Ensure internet connection is active
4. Try reconnecting to MongoDB Atlas cluster
5. Check MongoDB Atlas cluster status

### Email Not Sending

**Symptoms:**
```
Error: Invalid login: 535-5.7.8 Username and Password not accepted
```

**Solutions:**
1. Verify Gmail 2-Step Verification is enabled
2. Use App Password (NOT regular Gmail password)
3. Confirm `EMAIL_USERNAME` and `EMAIL_PASSWORD` are correct
4. Regenerate App Password if necessary
5. Check Gmail account is not locked

### CORS Error

**Symptoms:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions:**
1. Ensure backend is running on port 3000
2. Verify `CLIENT_URL` matches frontend URL exactly
3. Check `server/.env` has correct `CLIENT_URL`
4. Restart backend after changing `CLIENT_URL`

### Port Already in Use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -i :3000
kill -9 <PID>
```

Or change `PORT` in `server/.env` to another port (e.g., 3001)

### Groq API Error

**Symptoms:**
```
Error: 401 Unauthorized
Invalid API key
Rate limit exceeded
```

**Solutions:**
1. Verify `GROQ_API_KEY` is set correctly
2. Check key at [Groq Console](https://console.groq.com)
3. Ensure key hasn't been revoked
4. Check API usage limits
5. Generate new key if necessary

### Module Not Found

**Symptoms:**
```
Error: Cannot find module 'express'
```

**Solutions:**
1. Run `npm install` in the correct directory
2. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
3. Clear npm cache: `npm cache clean --force`
4. Try `npm ci` instead of `npm install`

## Development Tips

### Hot Reload

- **Frontend**: Vite provides hot reload by default
- **Backend**: Nodemon automatically restarts on file changes
- Changes appear instantly in browser (no refresh needed)

### Debugging

**Frontend (Browser DevTools):**
1. Open browser → F12 → Console tab
2. Check for errors and API calls
3. Use React DevTools extension

**Backend (Console Logs):**
1. Check terminal output for error messages
2. Add `console.log()` for debugging
3. Use `console.error()` for errors

### Testing API Endpoints

Use **REST Client** extension or **Postman**:

1. Install REST Client extension in VS Code
2. Create `test.http` file
3. Write API requests:

```http
@host = http://localhost:3000
@token = your_jwt_token_here

### Register
POST {{host}}/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "SecurePass123!"
}

### Login
POST {{host}}/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "SecurePass123!"
}
```

### Code Style

- **Frontend**: ESLint configured in project
- **Backend**: Follow Express best practices
- Use consistent indentation (2 spaces)
- Add comments for complex logic

### Useful Commands

```bash
# Root directory
npm run setup        # Install all dependencies
npm run dev          # Start both frontend and backend
npm run server       # Start only backend
npm run client       # Start only frontend

# Server directory
npm run dev          # Start with hot reload (nodemon)
npm start            # Start in production mode

# Client directory
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Next Steps

1. ✅ Complete this setup
2. 📖 Read [CONTRIBUTING.md](CONTRIBUTING.md)
3. 🔍 Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) if issues arise
4. 📋 Review [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) before pushing to GitHub
5. 🚀 Start developing!

## Need Help?

- Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues
- Review [GitHub Issues](https://github.com/yourusername/ai-cold-mail-generator/issues)
- Read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines
- Contact: [your-email@example.com](mailto:your-email@example.com)
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

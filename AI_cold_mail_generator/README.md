# AI Cold Mail Generator

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org)

A web application that generates personalized cold emails using AI (Groq Llama model) with user authentication and OTP email verification.

## ✨ Features

- 🔐 **User Authentication** - Secure registration and login with JWT
- 📧 **OTP Email Verification** - 6-digit OTP sent to email for verification
- 🤖 **AI Email Generation** - Uses Groq's Llama model to generate personalized emails
- 💾 **Email History** - Save and manage generated emails
- 🎨 **Modern UI** - Built with React and TailwindCSS
- 🔒 **Input Validation** - Comprehensive client and server-side validation
- 🌐 **CORS Enabled** - Secure cross-origin communication

## 📋 Project Structure

```
├── client/                          # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── VerifyOtp.jsx
│   │   ├── context/                 # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── utils/                   # Utilities
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Backend (Node.js + Express)
│   ├── config/                      # Configuration
│   │   └── db.js
│   ├── controllers/                 # Request handlers
│   │   ├── authController.js
│   │   └── aiController.js
│   ├── middlewares/                 # Custom middleware
│   │   └── authmiddleware.js
│   ├── models/                      # MongoDB schemas
│   │   ├── User.js
│   │   └── emailHistory.js
│   ├── routes/                      # API routes
│   │   ├── authRoutes.js
│   │   └── aiRoutes.js
│   ├── utils/                       # Utilities
│   │   └── emailService.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── package.json
├── README.md
├── SETUP.md
├── CONTRIBUTING.md
├── DEPLOYMENT_CHECKLIST.md
├── TROUBLESHOOTING.md
├── GITHUB_READY_SUMMARY.md
└── LICENSE
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** v14+ - [Download](https://nodejs.org)
- **npm** or **yarn**
- **MongoDB Atlas** account - [Create free cluster](https://www.mongodb.com/cloud/atlas)
- **Resend account** - [Sign up free](https://resend.com)
- **Groq API key** - [Get free key](https://console.groq.com)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devsaini889/ai-cold-mail-generator.git
   cd ai-cold-mail-generator
   ```

2. **Install all dependencies**
   ```bash
   npm run setup
   ```

3. **Configure environment variables**

   **Backend (`server/.env`):**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your credentials
   ```

   **Frontend (`client/.env`):**
   ```bash
   cd ../client
   cp .env.example .env
   # Edit .env with your API URL
   ```

4. **Start the application**

   **Option 1 - Run both concurrently (from root):**
   ```bash
   npm run dev
   ```

   **Option 2 - Run separately:**

   Terminal 1 (Backend):
   ```bash
   cd server
   npm run dev
   ```

   Terminal 2 (Frontend):
   ```bash
   cd client
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api

## 📚 Detailed Setup Guides

- [Complete Setup Guide](SETUP.md) - Step-by-step installation and configuration
- [Contributing Guidelines](CONTRIBUTING.md) - How to contribute to the project
- [Deployment Checklist](DEPLOYMENT_CHECKLIST.md) - Pre-deployment checks
- [Troubleshooting Guide](TROUBLESHOOTING.md) - Common issues and solutions

## 🔑 Environment Variables

### Server (`server/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT tokens | Random 32-character string |
| `GROQ_API_KEY` | Groq API key for AI email generation | Get from [Groq Console](https://console.groq.com) |
| `RESEND_API_KEY` | Resend API key for sending OTP emails | Get from [Resend Console](https://resend.com/api-keys) |
| `EMAIL_FROM` | Sender email address (verified in Resend) | `noreply@yourdomain.com` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |

### Client (`client/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3000/api` |
| `VITE_NODE_ENV` | Environment mode | `development` or `production` |

## 🛠️ Technology Stack

### Frontend
- **React** 19.2.5 - UI library
- **Vite** 8.0.10 - Build tool
- **TailwindCSS** 4.2.4 - CSS framework
- **React Router** 7.15.0 - Routing
- **Axios** 1.16.0 - HTTP client
- **React Hot Toast** 2.6.0 - Notifications

### Backend
- **Node.js** - Runtime
- **Express** 5.2.1 - Web framework
- **MongoDB** + **Mongoose** 9.6.1 - Database
- **JWT** 9.0.3 - Authentication
- **Bcrypt** 6.0.0 - Password hashing
- **Resend** 6.12.3 - Email service for OTP
- **Groq API** - AI email generation

## 📖 API Documentation

### Authentication Endpoints

#### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### Verify OTP
```bash
POST /api/auth/verify-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456"
}
```

### AI Email Generation

#### Generate Email
```bash
POST /api/ai/generate-email
Authorization: Bearer <token>
Content-Type: application/json

{
  "prompt": "Generate a cold email for a software developer..."
}
```

#### Get Email History
```bash
GET /api/ai/email-history
Authorization: Bearer <token>
```

## ✅ Validation Rules

### Registration
- **Username**: 3-30 characters, alphanumeric with underscores/hyphens
- **Email**: Valid email format
- **Password**: Min 8 characters, must include uppercase, lowercase, number, special character

### Email Generation
- **Prompt**: 10-2000 characters

### OTP
- **Format**: 6 digits
- **Expiration**: 10 minutes

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with Bcrypt
- ✅ Email verification with OTP
- ✅ CORS protection
- ✅ Input validation (client & server)
- ✅ Environment variable protection
- ✅ Error handling without exposing sensitive data

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 🐛 Issues & Support

Found a bug? Have a suggestion? [Open an issue](https://github.com/devsaini889/ai-cold-mail-generator/issues)

For detailed troubleshooting, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

## 👨‍💻 Author

Created with ❤️ by Saini

## 📞 Contact

- Email: ds0752607@gmail.com
- GitHub: [@devsaini889](https://github.com/devsaini889)

---

**⭐ If you found this helpful, please give it a star!**
   
   **Terminal 2 - Frontend:**
   ```bash
   cd client
   npm run dev
   ```
   
   - Backend runs on `http://localhost:3000`
   - Frontend runs on `http://localhost:5173`

## 📚 API Endpoints

### Authentication Routes

#### Register
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "username": "username",
    "email": "user@example.com",
    "password": "Password123"
  }
  ```
- **Response:** User registered, OTP sent to email

#### Verify OTP
- **POST** `/api/auth/verify-otp`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "otp": "123456"
  }
  ```
- **Response:** JWT token for authenticated sessions

#### Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "Password123"
  }
  ```
- **Response:** JWT token (requires email verification first)

### AI Routes
- **POST** `/api/ai/*` - AI email generation endpoints

## 🔐 Features

- ✅ User registration with email verification
- ✅ OTP-based email verification (10-minute validity)
- ✅ Secure password hashing with bcrypt
- ✅ JWT authentication tokens (24-hour expiry)
- ✅ MongoDB integration for user storage
- ✅ Email service integration with Resend API
- ✅ AI-powered email generation using Groq LLM
- ✅ CORS protection for API endpoints
- ✅ Input validation and sanitization
- ✅ Error handling and logging

### Security & Validation

**Password Requirements:**
- Minimum 6 characters
- At least one letter
- At least one number
- Special characters allowed

**Username Requirements:**
- 3-30 characters
- Alphanumeric, underscores, and hyphens only
- Unique per user

**Email Validation:**
- Standard email format check
- Unique per user
- Required for authentication

**OTP Validation:**
- 6-digit numeric code
- 10-minute expiration
- One-time use only

**Prompt Validation:**
- Minimum 10 characters
- Maximum 2000 characters
- Required for email generation

## 🛠️ Technologies Used

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing
- **Resend** 6.12.3 - Email service for OTP delivery
- **axios** - HTTP client for API calls
- **Groq API** - LLM for email generation (Llama model)
- **dotenv** - Environment variable management
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **React 19** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Toast notifications
- **Hero Icons** - Icon library

## 📝 Environment Variables

### Backend (`server/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_super_secret_key_12345` |
| `RESEND_API_KEY` | Resend API key for OTP | `re_your_api_key_here` |
| `EMAIL_FROM` | Sender email address | `noreply@yourdomain.com` |
| `GROQ_API_KEY` | Groq API key for Llama model | `your_groq_api_key_here` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |

### Frontend (`client/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3000/api` |
| `VITE_NODE_ENV` | Environment mode | `development` |

## 🐛 Troubleshooting

### "Invalid OTP" Error
- Ensure OTP was sent within the last 10 minutes
- Verify email matches the one used during registration
- Check that OTP in request matches the one received

### Email Not Sending
- Verify Resend API key is correct and active
- Ensure EMAIL_FROM is set to a verified sender address
- Check `RESEND_API_KEY` is set correctly in server/.env
- Verify internet connection is active

### Database Connection Error
- Check `MONGODB_URI` is correct
- Verify MongoDB Atlas IP whitelist includes your IP
- Ensure network connection is active

## 📄 License

ISC

## 👤 Author

[Saini - devsaini889](https://github.com/devsaini889)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

For questions or support, please reach out to [your-email@example.com]

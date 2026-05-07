# AI Cold Mail Generator

A web application that generates personalized cold emails using AI and includes user authentication with OTP verification.

## 📋 Project Structure

```
├── client/              # Frontend application
├── server/              # Backend API
│   ├── config/          # Database and configuration
│   ├── controllers/      # Request handlers (auth, AI)
│   ├── middlewares/      # Custom middleware
│   ├── models/           # MongoDB schemas (User)
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions (email service)
│   ├── server.js         # Express server entry point
│   └── package.json      # Node.js dependencies
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Gmail account (for email verification)
- Groq API key (for AI email generation)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AI_cold_mail_generator
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   ```
   
   Update `server/.env` with your credentials:
   - `MONGO_URI`: MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string for JWT signing
   - `EMAIL_USERNAME`: Your Gmail address
   - `EMAIL_PASSWORD`: Gmail app password
   - `GROQ_API_KEY`: Your Groq API key (for Llama model access)
   - `PORT`: Server port (default: 3000)
   - `NODE_ENV`: Environment (development/production)
   - `CLIENT_URL`: Frontend URL (http://localhost:5173 for development)

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   cp .env.example .env
   ```
   
   Update `client/.env`:
   - `VITE_API_BASE_URL`: Backend API URL (http://localhost:3000/api for development)

4. **Gmail Setup for Email Verification**
   
   To enable OTP email verification:
   
   1. Go to [Google Account Security](https://myaccount.google.com/security)
   2. Enable 2-Step Verification (if not already enabled)
   3. Generate an App Password:
      - Go to "App passwords" section
      - Select "Mail" and "Windows Computer"
      - Copy the 16-character password
   4. Add the app password to your `server/.env` file:
      ```
      EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
      ```

5. **Groq API Setup**
   
   To enable AI email generation:
   
   1. Go to [Groq Console](https://console.groq.com)
   2. Create an API key
   3. Add it to your `server/.env`:
      ```
      GROQ_API_KEY=your_groq_api_key_here
      ```

6. **Start the Application**
   
   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm start      # Production mode
   npm run dev    # Development mode with auto-reload
   ```
   
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
- ✅ Email service integration with nodemailer
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
- **nodemailer** - Email service for OTP delivery
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
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_super_secret_key_12345` |
| `EMAIL_USERNAME` | Gmail address for OTP | `your-email@gmail.com` |
| `EMAIL_PASSWORD` | Gmail app password | `xxxx xxxx xxxx xxxx` |
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
- Verify Gmail app password is correct
- Ensure 2-Step Verification is enabled on Gmail account
- Check `EMAIL_USERNAME` is set correctly
- Verify internet connection and SMTP accessibility

### Database Connection Error
- Check `MONGODB_URI` is correct
- Verify MongoDB Atlas IP whitelist includes your IP
- Ensure network connection is active

## 📄 License

ISC

## 👤 Author

[Your Name/Organization]

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

For questions or support, please reach out to [your-email@example.com]

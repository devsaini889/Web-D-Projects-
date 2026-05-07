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
- MongoDB Atlas account
- Gmail account (for email verification)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AI\ cold\ mail\ generator
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your credentials:
   - `MONGODB_URI`: MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `EMAIL_USERNAME`: Your Gmail address
   - `EMAIL_PASSWORD`: Gmail app password (see below)
   - `PORT`: Server port (default: 3000)

4. **Gmail Setup for Email Verification**
   
   To enable OTP email verification:
   
   1. Go to [Google Account Security](https://myaccount.google.com/security)
   2. Enable 2-Step Verification (if not already enabled)
   3. Generate an App Password:
      - Go to "App passwords" section
      - Select "Mail" and "Windows Computer"
      - Copy the 16-character password
   4. Add the app password to your `.env` file:
      ```
      EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
      ```

5. **Start the server**
   ```bash
   npm start      # Production mode
   npm run dev    # Development mode with auto-reload
   ```

   Server runs on `http://localhost:3000`

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
- ✅ JWT authentication tokens
- ✅ MongoDB integration for user storage
- ✅ Email service integration with nodemailer
- ✅ AI-powered email generation

## 🛠️ Technologies Used

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **nodemailer** - Email service
- **dotenv** - Environment configuration

### Frontend
- *(To be documented)*

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secret_key_here` |
| `EMAIL_USERNAME` | Gmail address for OTP | `your-email@gmail.com` |
| `EMAIL_PASSWORD` | Gmail app password | `xxxx xxxx xxxx xxxx` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` or `production` |

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

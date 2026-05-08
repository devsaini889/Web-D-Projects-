# Troubleshooting Guide

Complete guide to resolve common issues in the AI Cold Mail Generator.

## Table of Contents

1. [Database Issues](#database-issues)
2. [Connection Issues](#connection-issues)
3. [Authentication Issues](#authentication-issues)
4. [Email Issues](#email-issues)
5. [API Issues](#api-issues)
6. [Frontend Issues](#frontend-issues)
7. [General Issues](#general-issues)

---

## Database Issues

### MongoDB Connection Failed

**Error Messages:**
```
MongooseError: connect ECONNREFUSED
ConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:27017
Could not connect to any servers in your MongoDB Atlas cluster
```

**Causes & Solutions:**

1. **Incorrect Connection String**
   - Check format: `mongodb+srv://username:password@cluster.mongodb.net/database_name`
   - Verify username and password are URL-encoded
   - Special characters must be encoded: `@` = `%40`, `:` = `%3A`
   
   ```bash
   # Example with special chars
   MONGODB_URI=mongodb+srv://user%40example.com:pass%40word@cluster.mongodb.net/db_name
   ```

2. **IP Not Whitelisted**
   - Go to MongoDB Atlas → Network Access
   - Check if your IP is listed
   - For development: Add `0.0.0.0/0` (allows all IPs)
   - For production: Add only your server IP
   - Wait 2-5 minutes for changes to take effect

3. **Database User Doesn't Exist**
   - Go to MongoDB Atlas → Database Access
   - Verify user exists
   - Check user has "Read and write to any database" permissions
   - Create new user if needed

4. **Cluster Not Running**
   - Go to MongoDB Atlas → Databases
   - Check cluster status (should be "Active")
   - If paused, click "Resume"

5. **Network Issues**
   ```bash
   # Test internet connectivity
   ping mongodb.net
   
   # Test MongoDB servers
   nslookup cluster.mongodb.net
   ```

**Quick Fix:**
1. Verify `.env` has correct `MONGODB_URI`
2. Go to MongoDB Atlas and click "Network Access"
3. Add your current IP (or 0.0.0.0 for dev)
4. Wait 5 minutes and restart server

---

## Connection Issues

### Cannot Reach API Endpoint (Frontend to Backend)

**Error Messages:**
```
fetch failed
Cannot fetch from http://localhost:3000/api
Access to XMLHttpRequest blocked by CORS policy
```

**Causes & Solutions:**

1. **Backend Not Running**
   ```bash
   # Check if backend is running
   curl http://localhost:3000
   
   # Start backend if not running
   cd server
   npm run dev
   
   # Should see: Server is running on port 3000
   ```

2. **Incorrect API Base URL**
   - Check `client/.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```
   - Restart frontend: `npm run dev`
   - Clear browser cache (Ctrl+Shift+Delete)

3. **CORS Configuration Issue**
   ```bash
   # Check server/.env
   CLIENT_URL=http://localhost:5173
   
   # Backend CORS setup
   app.use(cors({
     origin: process.env.CLIENT_URL,
     credentials: true
   }));
   ```
   - Restart backend after changing `CLIENT_URL`

4. **Port Already in Use**
   
   **Windows:**
   ```bash
   # Find process using port 3000
   netstat -ano | findstr :3000
   
   # Kill the process (replace PID)
   taskkill /PID 1234 /F
   
   # Or use different port
   # Edit server/.env: PORT=3001
   ```
   
   **Mac/Linux:**
   ```bash
   # Find process
   lsof -i :3000
   
   # Kill process
   kill -9 1234
   ```

5. **Firewall Blocking**
   - Windows: Check Windows Defender Firewall
   - Mac: Check System Preferences → Security & Privacy
   - Allow Node.js access

**Verification:**
```bash
# Test API endpoint manually
curl -X GET http://localhost:3000/api/auth/verify

# Should return either a response or API error (not connection error)
```

### Backend Can't Connect to Frontend

**Cause:** Usually a CORS issue

**Solution:**
1. Update `server/.env` with frontend URL:
   ```env
   CLIENT_URL=http://localhost:5173
   # For production
   # CLIENT_URL=https://yourdomain.com
   ```
2. Restart backend
3. Test again

---

## Authentication Issues

### "Invalid email or password" (Credentials Seem Correct)

**Possible Causes:**
1. User account doesn't exist
2. Account not OTP verified
3. Typo in email or password
4. Password case-sensitive

**Solutions:**

1. **Check if Account Exists**
   - Try registering again
   - If "email already exists" → account exists
   - If registration succeeds → old account didn't exist

2. **Check if Account is Verified**
   - Must complete OTP verification after registration
   - Can't login without verification
   - Go through OTP verification flow

3. **Reset Password**
   - Currently not implemented
   - Register with new account
   - Use strong password with:
     - Uppercase letters (A-Z)
     - Lowercase letters (a-z)
     - Numbers (0-9)
     - Special characters (!@#$%^&*)
     - Minimum 8 characters

4. **Try with Known Credentials**
   - Register new account
   - Verify OTP immediately
   - Attempt login right after

### "Invalid OTP" or "OTP Expired"

**Error Messages:**
```
OTP has expired. Please register again.
Invalid OTP entered
```

**Causes & Solutions:**

1. **OTP Expired**
   - OTP expires in 10 minutes after registration
   - Solution: Register again to get new OTP

2. **Wrong OTP**
   - Check email for correct OTP
   - Verify you're entering all 6 digits
   - OTP is case-sensitive if containing letters
   - Don't include spaces

3. **Email Didn't Arrive**
   - Check spam/junk folder
   - Verify email address is correct
   - Check `server/.env` has valid `EMAIL_USERNAME` and `EMAIL_PASSWORD`
   - See [Email Issues](#email-issues) section

4. **OTP Not Sending at All**
   ```bash
   # Check backend logs for email errors
   # Should see: "OTP sent to your email"
   ```

### "User is not verified"

**Cause:** Account registered but OTP not verified

**Solutions:**
1. Complete the OTP verification process
2. Check email for OTP (may be in spam)
3. Verify OTP before attempting login
4. If OTP expired (>10 min), register again

### "Token Expired" or "Invalid Token"

**Error Message:**
```
Token has expired
Invalid token
```

**Solutions:**

1. **Login Again**
   - Old token expired (typically 24 hours)
   - Use your credentials to login again
   - Get new JWT token

2. **Check Token Format**
   - Must start with: `Bearer `
   - Example: `Authorization: Bearer eyJhbGciOiJIUzI1NiIs...`
   - No extra spaces or characters

3. **Token in Development**
   - Tokens expire in 24 hours
   - Logout and login again
   - Reload page after login

---

## Email Issues

### "Email Not Sending" or "Failed to Send OTP Email"

**Error Messages:**
```
Invalid login: 535-5.7.8 Username and Password not accepted
SMTP Error: authenticate failed
Error: Mail command failed
```

**Causes & Solutions:**

1. **Gmail App Password Issue**
   
   **Check if 2-Step Verification is Enabled:**
   ```
   1. Go to myaccount.google.com
   2. Click "Security"
   3. Find "2-Step Verification"
   4. Should be "ON" (green)
   5. If OFF, click to enable
   ```

   **Generate New App Password:**
   ```
   1. Go to myaccount.google.com/apppasswords
   2. Select "Mail" dropdown
   3. Select "Windows Computer" dropdown
   4. Click "Generate"
   5. Copy the 16-character password
   6. Update server/.env: EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   7. Restart backend server
   ```

2. **Wrong Email/Password in .env**
   ```env
   # Example - use YOUR Gmail
   EMAIL_USERNAME=your-email@gmail.com
   EMAIL_PASSWORD=your_16_char_app_password (NOT your Gmail password)
   ```
   - Verify both values are correct
   - App password is 16 characters with spaces
   - Restart backend after changes

3. **Gmail Account Locked**
   - Go to [Gmail Security Check](https://myaccount.google.com/security-checkup)
   - Complete security check
   - Try again

4. **Rate Limiting**
   - Gmail limits emails sent
   - Wait a few minutes between attempts
   - Don't register multiple accounts rapidly

5. **Firewall/VPN Issues**
   - Some networks block SMTP
   - Try different network
   - Disable VPN temporarily

**Test Email Service:**
```bash
# Check backend logs for email errors
# Should see in terminal: "OTP sent successfully"

# If not working, verify:
# 1. server/.env has EMAIL_USERNAME
# 2. server/.env has valid EMAIL_PASSWORD
# 3. Gmail 2FA is enabled
# 4. Backend is restarted after changes
```

### "Email Address Invalid"

**Causes:**
1. Not a valid email format
2. Typo in email address

**Solutions:**
- Use valid format: `user@domain.com`
- Check for typos
- No spaces in email address

---

## API Issues

### "Prompt validation failed" in Email Generation

**Error:**
```
Prompt must be between 10-2000 characters
```

**Solutions:**
1. Prompt too short (< 10 characters)
   - Write more detailed prompt
   - Minimum 10 characters required

2. Prompt too long (> 2000 characters)
   - Shorten the prompt
   - Maximum 2000 characters allowed

### "Groq API Error" or "Invalid API Key"

**Error Messages:**
```
401 Unauthorized
Invalid API key
Error: 429 Rate limit exceeded
```

**Causes & Solutions:**

1. **Wrong or Missing API Key**
   ```bash
   # Check server/.env
   GROQ_API_KEY=your_actual_groq_key
   
   # Verify key is correct:
   # 1. Go to console.groq.com
   # 2. Check "API Keys" section
   # 3. Copy exact key
   # 4. Paste in .env
   # 5. Restart backend
   ```

2. **API Key Revoked or Expired**
   - Go to [Groq Console](https://console.groq.com)
   - Check API Keys section
   - Generate new key if necessary
   - Update `server/.env`
   - Restart backend

3. **Rate Limit Exceeded**
   - Wait a few minutes
   - Groq has usage limits on free tier
   - Try again later

4. **No Internet Connection**
   - Backend can't reach Groq API
   - Check internet connectivity
   - Check firewall isn't blocking API.groq.com

### "Email Generation Failed"

**Possible Causes:**
1. Groq API not working
2. Invalid prompt
3. No authorization token

**Solutions:**
1. Login first to get token
2. Check Groq API key is valid
3. Try simpler prompt
4. Check backend logs for errors
5. Check internet connection

---

## Frontend Issues

### Page Not Loading or Blank Screen

**Solutions:**
1. Check browser console (F12)
2. Look for error messages
3. Verify frontend running: `npm run dev`
4. Check `client/.env` exists and has correct values
5. Clear browser cache: Ctrl+Shift+Delete
6. Hard refresh: Ctrl+F5

### "Cannot find module" or "Module not found"

**Example:**
```
Cannot find module 'react'
Cannot find module '@heroicons/react'
```

**Solutions:**
```bash
# In client directory
npm install

# If still failing:
rm -rf node_modules package-lock.json
npm install
```

### Tailwind CSS Not Loading (No Styling)

**Solutions:**
1. Check `client/package.json` has tailwindcss
2. Restart dev server: Stop (Ctrl+C) and run `npm run dev` again
3. Clear browser cache
4. Check `client/src/index.css` imports Tailwind

### React Router Not Working

**Error:**
```
Cannot find route
Page not found
```

**Solutions:**
1. Verify `client/src/App.jsx` has routing configured
2. Check page components exist in `client/src/pages/`
3. Restart dev server

---

## General Issues

### "npm ERR! code ENOENT"

**Cause:** package.json or node_modules corrupted

**Solutions:**
```bash
# Navigate to directory
cd server  # or cd client

# Clean install
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Port 3000 or 5173 Already in Use

**Windows:**
```bash
# Find process using port
netstat -ano | findstr :3000

# Kill process (replace 1234 with actual PID)
taskkill /PID 1234 /F

# Or change port in server/.env: PORT=3001
```

**Mac/Linux:**
```bash
# Find process
lsof -i :3000

# Kill process
kill -9 1234

# Or change port in .env
```

### ".env file not found"

**Solutions:**
```bash
# Create from example
cp .env.example .env

# Or manually copy contents
# then update with your values
```

### "Module not found: @vitejs/plugin-react"

**Solutions:**
```bash
cd client
npm install @vitejs/plugin-react
```

### Node/npm Version Issues

**Check versions:**
```bash
node --version    # Should be v14+
npm --version     # Should be v6+
```

**Update Node.js:**
- Download from [nodejs.org](https://nodejs.org)
- Reinstall to update npm automatically

### "Unexpected token" or Syntax Error

**Cause:** Invalid code or configuration

**Solutions:**
1. Check for typos in `.env` files
2. Verify JSON syntax in config files
3. Check for missing commas in code
4. Look at line number in error message

---

## Still Having Issues?

1. **Check Logs**
   - Backend: Terminal where `npm run dev` runs
   - Frontend: Browser console (F12)
   - Errors usually show exact issue

2. **Restart Everything**
   ```bash
   # Kill all Node processes
   # Close all terminals
   # Delete node_modules and reinstall
   # Start fresh
   ```

3. **Review Documentation**
   - [SETUP.md](SETUP.md) - Setup guide
   - [README.md](README.md) - Project overview
   - [CONTRIBUTING.md](CONTRIBUTING.md) - Contributing

4. **Get Help**
   - [GitHub Issues](https://github.com/yourusername/ai-cold-mail-generator/issues)
   - Email: [your-email@example.com](mailto:your-email@example.com)
   - Include:
     - Error message
     - What you were doing
     - Your setup (Node version, OS)
     - Steps to reproduce

3. **Token expiry:**
   - Tokens expire in 24 hours
   - Generate new token by logging in again

## Email Issues

### "Email send error" or "Failed to send email"

**Symptoms:**
```
Error: Invalid login: 535-5.7.8 Username and Password not accepted
```

**Solutions:**

1. **Gmail Setup:**
   - [ ] 2-Step Verification enabled
   - [ ] App password generated (not regular password)
   - [ ] App password is 16 characters
   - [ ] Remove spaces from password in .env

2. **Verify Credentials:**
   ```bash
   # In .env, check:
   EMAIL_USERNAME=your-email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # NO SPACES in actual value
   ```

3. **Get New App Password:**
   - Go to Google Account → Security
   - App passwords → Mail → Windows Computer
   - Generate new password
   - Update .env

4. **Test Email Service:**
   ```javascript
   // In Node REPL
   const sendEmail = require('./utils/emailService');
   sendEmail({
     to: 'test@example.com',
     subject: 'Test',
     text: 'Test email'
   });
   ```

### "No email received"

**Check:**
1. Email sent (check server logs)
2. Check spam/junk folder
3. Wait 1-2 minutes
4. Verify email address is correct
5. Check OTP in database

## API Issues

### "Request too large" or "Prompt too long"

**Solutions:**
- Reduce prompt length (max 2000 characters)
- Split long prompts into multiple requests

### "Groq API error" or "Failed to generate email"

**Symptoms:**
```
Error: 401 Unauthorized
Error: Invalid API key
Error: 429 Rate limited
```

**Solutions:**

1. **Verify API Key:**
   ```bash
   # Check .env
   GROQ_API_KEY=your_actual_api_key_here
   ```

2. **Check API Key:**
   - Visit [Groq Console](https://console.groq.com)
   - Verify key is valid and active
   - Hasn't been regenerated

3. **Rate Limiting:**
   - Check Groq usage limits
   - Wait and try again
   - Implement request queuing

4. **Network:**
   ```bash
   # Test API connectivity
   curl -X POST https://api.groq.com/openai/v1/chat/completions \
     -H "Authorization: Bearer YOUR_KEY" \
     -H "Content-Type: application/json" \
     -d '{...}'
   ```

### "OTP validation failed" or "Invalid OTP"

**Causes:**
1. Wrong OTP entered
2. OTP expired (>10 minutes)
3. OTP format incorrect

**Solutions:**

1. **Check OTP:**
   - OTP is 6 digits
   - Case-sensitive
   - Copy exactly from email

2. **Check expiry:**
   ```bash
   # Check in database
   db.users.findOne({ email: "..." })
   # Check otpExpiry time vs current time
   ```

3. **Request new:**
   - Currently requires re-registering
   - Consider implementing OTP resend feature

## Database Issues

### "Duplicate key error"

**Cause:** Email or username already exists

**Solutions:**

1. **Use different email:**
   - Email must be unique
   - Use different email address

2. **Use different username:**
   - Username must be unique
   - Use different username

3. **Check existing user:**
   ```bash
   db.users.findOne({ email: "your-email@example.com" })
   # If found, use different email
   ```

### "Database is empty"

**Solutions:**

1. **Verify connection:**
   - Check MONGO_URI is correct
   - Check collections exist

2. **Create indexes (optional):**
   ```bash
   db.users.createIndex({ email: 1 })
   db.users.createIndex({ username: 1 })
   ```

## Performance Issues

### "API response is slow"

**Causes:**
1. Large dataset queries
2. Groq API latency
3. Database indexes missing

**Solutions:**

1. **Add pagination:**
   ```javascript
   // Limit email history
   .limit(20)
   .skip((page - 1) * 20)
   ```

2. **Add database indexes:**
   ```bash
   db.emailhistory.createIndex({ user: 1, createdAt: -1 })
   ```

3. **Optimize queries:**
   - Only fetch needed fields
   - Use `.lean()` for Mongoose

### "High memory usage"

**Solutions:**
1. Check for memory leaks
2. Implement caching
3. Add pagination
4. Monitor with Node profiler

## Frontend Issues

### "Styles not loading"

**Solutions:**
1. Check if Tailwind CSS is building
2. Verify `@tailwindcss/vite` is configured
3. Clear cache: `npm cache clean --force`
4. Rebuild: `npm run build`

### "React components not rendering"

**Solutions:**
1. Check browser console for errors
2. Verify Router setup in App.jsx
3. Check props are passed correctly
4. Clear browser cache

### "API calls failing"

**Solutions:**
1. Check Network tab in DevTools
2. Verify Authorization header format
3. Check CORS errors
4. Verify backend is running

## Getting Help

1. **Check logs:**
   - Browser Console (Frontend)
   - Terminal output (Backend)
   - MongoDB logs

2. **Enable debugging:**
   ```bash
   # Backend
   DEBUG=* npm run dev
   
   # Frontend
   VITE_DEBUG=true npm run dev
   ```

3. **Check status:**
   ```bash
   # Is MongoDB running?
   mongosh --eval "db.version()"
   
   # Can reach Groq API?
   curl https://api.groq.com
   ```

4. **Review logs:**
   - Check error messages carefully
   - Look for stack traces
   - Check environment variables

## Database Repair

### Reset Database (Development Only)

```bash
# Connect to MongoDB
mongosh

# Delete all users
db.users.deleteMany({})

# Delete all email history
db.emailhistory.deleteMany({})

# Verify
db.users.countDocuments()
db.emailhistory.countDocuments()
```

### Backup and Restore

```bash
# Backup
mongodump --uri="mongodb+srv://..." --out=./backup

# Restore
mongorestore --uri="mongodb+srv://..." ./backup
```

## Emergency Contacts

- **MongoDB Support:** [mongodb.com/support](https://www.mongodb.com/support)
- **Groq Support:** [groq.com/support](https://www.groq.com/support)
- **Node.js Issues:** [nodejs.org/issues](https://github.com/nodejs/node/issues)

---

**Still having issues?**

1. Check this guide again
2. Review error messages carefully
3. Check .env configuration
4. Check MongoDB Atlas settings
5. Create GitHub issue with detailed error

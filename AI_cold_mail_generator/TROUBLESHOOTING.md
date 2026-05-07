# Troubleshooting Guide

Common issues and their solutions.

## Connection Issues

### "Failed to connect to MongoDB"

**Symptoms:**
```
MongooseError: connect ECONNREFUSED
ConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**

1. **Check MongoDB URI:**
   ```bash
   # Verify format in .env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
   ```

2. **IP Whitelist:**
   - Go to MongoDB Atlas Dashboard
   - Network Access → IP Whitelist
   - Add your IP or 0.0.0.0 for development
   - Or use MongoDB Atlas provided IP restrictions

3. **Verify Credentials:**
   - Check username and password are correct
   - Ensure database name exists
   - Verify cluster name is correct

4. **Network Issues:**
   ```bash
   # Test connection
   ping mongodb.net
   
   # Check if MongoDB is running locally
   mongod --version
   ```

### "Cannot reach API endpoint"

**Symptoms:**
- Frontend can't connect to backend
- CORS errors in browser console
- `fetch failed` errors

**Solutions:**

1. **Verify backend is running:**
   ```bash
   cd server
   npm run dev
   # Should show: Server is running on port 3000
   ```

2. **Check API URL:**
   - Frontend `.env`: `VITE_API_BASE_URL=http://localhost:3000/api`
   - Backend running on port 3000
   - Frontend running on port 5173

3. **CORS Configuration:**
   ```javascript
   // In server.js, verify CORS is set correctly
   app.use(cors({
     origin: process.env.NODE_ENV === 'production' 
       ? process.env.CLIENT_URL 
       : 'http://localhost:5173',
     credentials: true
   }));
   ```

4. **Check ports:**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   netstat -ano | findstr :5173
   
   # Mac/Linux
   lsof -i :3000
   lsof -i :5173
   ```

## Authentication Issues

### "Invalid email or password" (but credentials are correct)

**Causes:**
1. User not verified
2. Email not registered
3. Password incorrect

**Solutions:**

1. **Verify user exists:**
   ```bash
   # Check in MongoDB
   db.users.findOne({ email: "your-email@example.com" })
   ```

2. **Check if verified:**
   ```bash
   # User should have isVerified: true
   db.users.findOne({ email: "your-email@example.com" })
   # Look for "isVerified": true
   ```

3. **If not verified:**
   - User needs to verify OTP first
   - Can't login without OTP verification

### "User is not verified"

**Cause:** User registered but didn't verify OTP

**Solutions:**

1. **Resend OTP:**
   - Currently not implemented
   - User needs to register again

2. **Verify OTP manually:**
   ```bash
   # Check OTP in database
   db.users.findOne({ email: "your-email@example.com" })
   # Look for "otp" field
   ```

3. **Check OTP expiry:**
   ```bash
   # OTP expires in 10 minutes
   # Check otpExpiry field in database
   new Date() > user.otpExpiry  // true = expired
   ```

### "Invalid token" or "Token expired"

**Solutions:**

1. **Get new token:**
   - Login again
   - Use new token in Authorization header

2. **Check token format:**
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
   ```

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

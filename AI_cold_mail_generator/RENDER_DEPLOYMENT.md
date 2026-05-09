# Render Deployment Guide

Complete guide to deploy the AI Cold Mail Generator on Render.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Render Setup](#render-setup)
3. [Prepare for Deployment](#prepare-for-deployment)
4. [Deploy on Render](#deploy-on-render)
5. [Post-Deployment](#post-deployment)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying on Render, ensure you have:

- ✅ GitHub account with repository pushed
- ✅ Render account (free at [render.com](https://render.com))
- ✅ MongoDB Atlas cluster running
- ✅ API keys ready:
  - Groq API key
  - Resend API key
  - JWT secret (generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

---

## Render Setup

### Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended for easy integration)
3. Connect your GitHub account

### Step 2: Create New Service

1. Click **New +** → **Web Service**
2. Select your GitHub repository: `ai-cold-mail-generator`
3. Choose deployment settings:
   - **Name**: `ai-cold-mail-api` (for backend)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build` (if needed)
   - **Start Command**: `node server/server.js`

### Step 3: Configure Environment Variables

1. Go to **Environment** section
2. Add the following variables:

```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
JWT_SECRET=<your-generated-secret>
GROQ_API_KEY=<your-groq-api-key>
RESEND_API_KEY=<your-resend-api-key>
EMAIL_FROM=noreply@yourdomain.com
CLIENT_URL=https://your-frontend-domain.onrender.com
```

---

## Prepare for Deployment

### Update Environment Files

#### Server `.env.example` → Render Variables

Your server already has proper configuration. Ensure these are in Render:

```bash
# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/db_name

# Authentication
JWT_SECRET=your-strong-random-secret

# AI Service
GROQ_API_KEY=your-groq-key

# Email Service
RESEND_API_KEY=your-resend-key
EMAIL_FROM=noreply@yourdomain.com

# Frontend URL
CLIENT_URL=https://your-frontend.onrender.com
```

### Update CORS Settings

The server is configured to accept requests from `CLIENT_URL` in production:

```javascript
// server/server.js
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL 
    : 'http://localhost:5173',
  credentials: true
}));
```

---

## Deploy on Render

### Option 1: Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Render automatically deploys when you push to `main` branch
3. Monitor deployment in Render dashboard

### Option 2: Manual Deployment

1. Go to your service in Render dashboard
2. Click **Manual Deploy** → **Deploy latest commit**
3. Watch deployment logs

### Deployment Steps for Both Backend and Frontend

#### Deploy Backend API

1. Create new Web Service
2. Select your repository
3. Settings:
   - Name: `ai-cold-mail-api`
   - Root Directory: `server` (if not auto-detected)
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add all environment variables
5. Click **Create Web Service**

#### Deploy Frontend

1. Create another Web Service
2. Same repository
3. Settings:
   - Name: `ai-cold-mail-client`
   - Root Directory: `client`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run preview` or use a Node static server
4. Set environment variable:
   - `VITE_API_BASE_URL=https://ai-cold-mail-api.onrender.com`
5. Click **Create Web Service**

---

## Post-Deployment

### Verify Deployment

1. **Test Backend API**
   ```bash
   curl https://ai-cold-mail-api.onrender.com/api/health
   # Should return 200 or API response
   ```

2. **Test Frontend**
   - Visit `https://ai-cold-mail-client.onrender.com`
   - Should load your app

3. **Test Authentication**
   - Register a new account
   - Verify OTP email is received
   - Login and generate an email

### Update DNS/Domain (Optional)

If you have a custom domain:

1. Go to Render Dashboard
2. Select your service
3. Click **Settings** → **Custom Domain**
4. Add your domain and update DNS settings

### Monitor Application

1. Go to **Logs** to check for errors
2. Check **Metrics** for performance
3. Enable **Auto-Deploy** from GitHub

---

## Troubleshooting

### Build Fails with "Module not found"

**Solution**: Ensure all dependencies are listed in `package.json`

```bash
npm install --save missing-package
git add package.json package-lock.json
git push
```

### "Cannot find module" at runtime

**Check**:
- ✅ File extensions (`.js` not `.ts`)
- ✅ Relative paths are correct
- ✅ `package.json` has `"type": "module"` for ES modules
- ✅ Node version is >= 14

### Database Connection Failed

**Solutions**:
1. Verify `MONGODB_URI` is correct
2. Whitelist Render IP in MongoDB Atlas:
   - Go to MongoDB Atlas → Network Access
   - Add `0.0.0.0/0` (allows all IPs for development)
   - Or add Render's IP range
3. Check database user has correct permissions

### CORS Errors

**Solution**: Ensure `CLIENT_URL` environment variable:
- ✅ Matches your frontend domain exactly
- ✅ Includes `https://` (not `http://`)
- ✅ Has no trailing slash

```
Correct: https://ai-cold-mail-client.onrender.com
Wrong: http://ai-cold-mail-client.onrender.com/
```

### Emails Not Sending

**Check**:
1. ✅ `RESEND_API_KEY` is correct
2. ✅ `EMAIL_FROM` is verified in Resend
3. ✅ Check Resend logs for delivery status
4. ✅ Check application logs for errors

### Port Already in Use

**Render handles this**: The platform automatically assigns ports. Don't hardcode port numbers.

### Free Plan Limitations

Render free tier:
- ✅ 0.5 CPU
- ✅ 512 MB RAM
- ✅ Spins down after 15 min of inactivity
- ✅ ~100 requests/minute

For production, upgrade to **Pro plan** ($12/month).

---

## Production Checklist

Before going live:

- [ ] All environment variables are set in Render
- [ ] `NODE_ENV=production`
- [ ] CORS is restricted to your frontend domain
- [ ] Database backups are configured
- [ ] Monitoring and alerts are enabled
- [ ] SSL/TLS certificate is valid (auto from Render)
- [ ] API rate limiting is configured (optional)
- [ ] Error logging is enabled
- [ ] Security headers are in place

---

## Monitoring & Maintenance

### Check Application Health

```bash
# View logs in Render dashboard
# or use curl to test endpoints

curl https://your-api.onrender.com/api/auth/register \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"Test123"}'
```

### Database Maintenance

- Regular MongoDB backups (Atlas handles this)
- Monitor database size
- Clean up old email history records

### Update Dependencies

```bash
# In local environment
npm outdated
npm update

# Test and push
git add package*.json
git commit -m "chore: update dependencies"
git push
```

---

## Performance Optimization

### For Free Tier

1. **Enable Compression**
   ```javascript
   app.use(compression());
   ```

2. **Cache API Responses**
   - Use Redis (optional)
   - Add Cache-Control headers

3. **Optimize Database Queries**
   - Add indexes
   - Use pagination for history

4. **Upgrade Plan** (Recommended)
   - Pro: $12/month
   - Team: Custom pricing

---

## Support & Resources

- [Render Documentation](https://render.com/docs)
- [GitHub Repository](https://github.com/devsaini889/ai-cold-mail-generator)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Groq API Docs](https://console.groq.com/docs)
- [Resend Email Docs](https://resend.com/docs)

---

## Next Steps

1. ✅ Deploy backend and frontend on Render
2. ✅ Test all functionality
3. ✅ Set up custom domain (optional)
4. ✅ Enable monitoring
5. ✅ Share your app!

Happy deploying! 🚀

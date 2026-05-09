# Pre-Deployment Checklist

Complete checklist before deploying AI Cold Mail Generator to production.

## Table of Contents

1. [Environment Setup](#environment-setup)
2. [Security Checks](#security-checks)
3. [Code Quality](#code-quality)
4. [Testing](#testing)
5. [Database](#database)
6. [Frontend](#frontend)
7. [Backend](#backend)
8. [Performance](#performance)
9. [Final Steps](#final-steps)

---

## Environment Setup

- [ ] Create production environment variables
- [ ] Verify all required environment variables are set
- [ ] Ensure `.env` file is NOT committed to git
- [ ] `.gitignore` includes `.env` and `.env.*`
- [ ] Environment variables are stored securely (not in code)
- [ ] Different `.env` files for development and production
- [ ] All secrets are strong and randomly generated

**Verification:**
```bash
# Check .gitignore includes .env
grep -E '\.env$' .gitignore

# Verify .env is not tracked
git ls-files | grep ".env"  # Should return nothing
```

---

## Security Checks

### API Keys & Secrets

- [ ] `JWT_SECRET` is a strong random string (32+ characters)
- [ ] `JWT_SECRET` changed from development value
- [ ] `GROQ_API_KEY` is valid and has correct permissions
- [ ] `GROQ_API_KEY` not exposed in logs or errors
- [ ] `RESEND_API_KEY` is valid and active
- [ ] `RESEND_API_KEY` not exposed in logs or errors
- [ ] `EMAIL_FROM` is set to verified sender address
- [ ] All API keys rotated from development
- [ ] No hardcoded passwords or tokens in code
- [ ] No secrets in comments or documentation

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### CORS & Origins

- [ ] `NODE_ENV` set to `production`
- [ ] `CLIENT_URL` set to production frontend domain
- [ ] CORS only accepts requests from production domain
- [ ] Not using `0.0.0.0` or `*` in production CORS settings
- [ ] CORS credentials properly configured

**Example Production CORS:**
```
CLIENT_URL=https://yourdomain.com
NOT: http://localhost:5173
NOT: *
```

### Database Security

- [ ] `MONGODB_URI` uses strong password
- [ ] MongoDB user has minimal required permissions
- [ ] Only production IP whitelisted in MongoDB Atlas
- [ ] Not using `0.0.0.0/0` (allow all IPs) in production
- [ ] Database user is not admin user
- [ ] Database user is specific to production environment
- [ ] Connection string is encrypted/secured

**Check MongoDB Atlas:**
- Go to Network Access
- Verify IP addresses are restricted
- Remove 0.0.0.0/0 if it exists

### Input Validation

- [ ] Email validation on server side
- [ ] Password strength validation enforced
- [ ] Username validation prevents injection
- [ ] Prompt length validated (10-2000 characters)
- [ ] All user inputs sanitized
- [ ] No SQL/NoSQL injection vulnerabilities
- [ ] Error messages don't reveal sensitive information

### Authentication & Tokens

- [ ] JWT tokens have appropriate expiration
- [ ] Passwords hashed with bcrypt (10+ salt rounds)
- [ ] OTP has proper expiration (10 minutes)
- [ ] OTP sent securely via email
- [ ] Session tokens secure and httpOnly (if applicable)
- [ ] Password reset mechanism requires verification
- [ ] Account lockout after failed attempts (if implemented)

### HTTPS & Transport

- [ ] Frontend served over HTTPS
- [ ] Backend API served over HTTPS
- [ ] Certificates are valid and not self-signed
- [ ] Environment variables encrypted in transit
- [ ] No sensitive data in query parameters
- [ ] Sensitive data sent in request body with POST/PUT

### Logging & Monitoring

- [ ] No console.log statements with sensitive data
- [ ] No API keys logged
- [ ] No passwords logged
- [ ] No personal information logged
- [ ] Logs are monitored/reviewed regularly
- [ ] Error tracking tool configured (optional)
- [ ] Performance monitoring configured (optional)

---

## Code Quality

### Syntax & Standards

- [ ] No syntax errors
- [ ] No TypeScript/ESLint errors
- [ ] Code follows project conventions
- [ ] Consistent naming (camelCase, PascalCase)
- [ ] Consistent indentation (2 spaces)
- [ ] Semicolons used consistently
- [ ] No trailing whitespace

**Check for errors:**
```bash
cd server && npm run lint  # If configured
cd ../client && npm run lint
```

### Code Review

- [ ] Code reviewed by at least one other person
- [ ] No hardcoded URLs or paths
- [ ] No debugging code left in
- [ ] No commented-out code blocks
- [ ] Meaningful variable and function names
- [ ] Functions do one thing well
- [ ] Code DRY (Don't Repeat Yourself)

### Dependencies

- [ ] All dependencies are up to date
- [ ] No unused dependencies
- [ ] No vulnerable dependencies
- [ ] `npm audit` passes (or vulnerabilities known)
- [ ] No deprecated packages
- [ ] Lock file (`package-lock.json`) is committed

**Check for vulnerabilities:**
```bash
npm audit
```

### Documentation

- [ ] README.md is accurate
- [ ] SETUP.md instructions are current
- [ ] API endpoints documented
- [ ] Environment variables documented
- [ ] Database schema documented
- [ ] README includes deployment instructions
- [ ] Troubleshooting guide is comprehensive

---

## Testing

### Manual Testing

- [ ] Registration works correctly
- [ ] OTP verification works
- [ ] Login works correctly
- [ ] Logout clears session/token
- [ ] Email generation works
- [ ] Email history retrieval works
- [ ] All forms validate input
- [ ] Error messages are helpful
- [ ] UI is responsive on mobile
- [ ] No console errors in browser DevTools

### Test Scenarios

- [ ] User registration with valid data
- [ ] User registration with invalid email
- [ ] User registration with weak password
- [ ] User registration with existing email
- [ ] OTP verification with correct OTP
- [ ] OTP verification with wrong OTP
- [ ] OTP verification after expiration
- [ ] Login with correct credentials
- [ ] Login with incorrect credentials
- [ ] Login without verification
- [ ] Email generation with valid prompt
- [ ] Email generation with short prompt (< 10 chars)
- [ ] Email generation with long prompt (> 2000 chars)
- [ ] Accessing protected routes without token
- [ ] Token expiration handling

### Edge Cases

- [ ] Very long usernames
- [ ] Special characters in email
- [ ] Special characters in password
- [ ] Network timeout handling
- [ ] Server errors handled gracefully
- [ ] Database connection loss handling
- [ ] API rate limiting

### Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

---

## Database

### MongoDB Atlas

- [ ] Production cluster created and configured
- [ ] Cluster is NOT free tier (or monitored closely)
- [ ] Automated backups enabled
- [ ] Backup retention configured
- [ ] Point-in-time recovery enabled
- [ ] Database user created with correct permissions
- [ ] Database user password is strong
- [ ] IP whitelist configured (production IPs only)
- [ ] Connection pooling configured

**Verify Backups:**
- Go to MongoDB Atlas → Backup
- Check "Backup enabled" is ON
- Verify backup frequency

### Database Security

- [ ] Database access requires authentication
- [ ] No public access to database (IP whitelisted)
- [ ] Encryption at rest enabled (optional)
- [ ] Encryption in transit enabled
- [ ] User permissions follow least privilege principle

### Data

- [ ] Schema is optimized for queries
- [ ] Necessary indexes created
- [ ] Database size monitored
- [ ] Storage capacity planning done
- [ ] Data retention policy defined
- [ ] GDPR compliance checked (if applicable)

---

## Frontend

### Build & Optimization

- [ ] Frontend builds without errors: `npm run build`
- [ ] Build size is reasonable (< 500KB gzipped)
- [ ] Assets are minified
- [ ] CSS is optimized
- [ ] JavaScript is bundled and optimized
- [ ] Images are optimized
- [ ] No source maps in production build
- [ ] Dist folder is generated correctly

**Verify Build:**
```bash
cd client
npm run build
# Check dist/ folder exists and has files
```

### Environment Variables

- [ ] `VITE_API_BASE_URL` points to production API
- [ ] `VITE_NODE_ENV` is set to `production`
- [ ] No development URLs in production build
- [ ] No console.log statements in production
- [ ] .env file not included in build

### Pages & Routes

- [ ] All pages load correctly
- [ ] Links point to correct routes
- [ ] Navigation works properly
- [ ] 404 page for invalid routes
- [ ] Redirects work (e.g., login → dashboard)
- [ ] Page transitions are smooth
- [ ] Loading states are shown

### Forms & Validation

- [ ] Registration form validates input
- [ ] Login form validates input
- [ ] OTP input accepts only 6 digits
- [ ] Email input validates format
- [ ] Password input validates strength
- [ ] Prompt input validates length
- [ ] Error messages are clear
- [ ] Success messages are shown

### User Experience

- [ ] Toast notifications work
- [ ] Error handling is user-friendly
- [ ] Loading indicators shown during API calls
- [ ] Buttons disabled during submission
- [ ] Mobile responsive design
- [ ] Dark mode works (if applicable)
- [ ] Accessibility standards met (WCAG)

---

## Backend

### Server Configuration

- [ ] `NODE_ENV` set to `production`
- [ ] `PORT` set to correct value
- [ ] `CLIENT_URL` set to production domain
- [ ] Server starts without errors
- [ ] Health check endpoint available
- [ ] Proper error handling implemented

**Test Server Start:**
```bash
cd server
NODE_ENV=production npm start
# Should show: Server is running on port 3000
```

### API Endpoints

- [ ] All endpoints return correct status codes
- [ ] Request validation works
- [ ] Response format is consistent
- [ ] Error responses are standardized
- [ ] No sensitive data in responses
- [ ] API rate limiting implemented (optional)
- [ ] Request/response logging configured

**Test Endpoints:**
```bash
# Test health check
curl http://localhost:3000

# Test API endpoint
curl http://localhost:3000/api/auth/verify
```

### Database Connection

- [ ] MongoDB connection string is correct
- [ ] Connection pooling configured
- [ ] Connection timeout configured
- [ ] Retry logic implemented
- [ ] Connection errors handled gracefully
- [ ] Connection closes on app shutdown

### Error Handling

- [ ] Try-catch blocks in async functions
- [ ] Proper HTTP error codes returned
- [ ] Error messages don't expose system details
- [ ] Stack traces not sent to client
- [ ] Validation errors clearly explained
- [ ] Database errors handled properly
- [ ] API call errors handled properly

### Middleware

- [ ] CORS middleware configured correctly
- [ ] Authentication middleware validates tokens
- [ ] Error handling middleware catches errors
- [ ] Request logging middleware (optional)
- [ ] Rate limiting middleware (optional)

### Performance

- [ ] Response times acceptable
- [ ] Database queries optimized
- [ ] No N+1 query problems
- [ ] Caching implemented (if applicable)
- [ ] Compression enabled (gzip)
- [ ] Load testing done (optional)

---

## Performance

### Frontend Performance

- [ ] Page load time < 3 seconds
- [ ] First contentful paint < 1.5 seconds
- [ ] Time to interactive < 3.5 seconds
- [ ] Bundle size optimized
- [ ] Images lazy-loaded
- [ ] Code splitting implemented
- [ ] Unused CSS removed

### Backend Performance

- [ ] API response time < 500ms
- [ ] Database query time < 100ms
- [ ] No memory leaks
- [ ] CPU usage normal
- [ ] Memory usage stable
- [ ] Concurrent requests handled well

### Monitoring (Optional)

- [ ] Error tracking tool configured
- [ ] Performance monitoring tool configured
- [ ] Log aggregation configured
- [ ] Alerts configured for critical issues

---

## Final Steps

### Before Going Live

1. **Final Code Review**
   - [ ] All code reviewed
   - [ ] All TODOs resolved
   - [ ] No console.logs in production code
   - [ ] No debug statements

2. **Final Testing**
   - [ ] Full end-to-end testing completed
   - [ ] All critical paths tested
   - [ ] Performance acceptable
   - [ ] Security issues resolved

3. **Backup & Recovery**
   - [ ] Database backup tested and verified
   - [ ] Disaster recovery plan documented
   - [ ] Rollback procedure documented
   - [ ] Hotfix procedure documented

4. **Documentation**
   - [ ] Deployment guide written
   - [ ] Monitoring guide written
   - [ ] Troubleshooting guide updated
   - [ ] Architecture documented

5. **Team Communication**
   - [ ] Team aware of deployment
   - [ ] Support team briefed
   - [ ] Status page updated
   - [ ] Communication plan ready

### Deployment Process

```bash
# 1. Final build
cd client && npm run build
cd ../server && npm install --production

# 2. Database migrations (if any)
# Run any pending migrations

# 3. Start server
NODE_ENV=production npm start

# 4. Verify
curl https://yourdomain.com/api/auth/verify

# 5. Monitor
Watch logs, error tracking, performance metrics
```

### Post-Deployment

- [ ] Verify application is running
- [ ] Check error tracking for issues
- [ ] Monitor performance metrics
- [ ] Check user feedback
- [ ] Be prepared to rollback if needed
- [ ] Document any issues encountered

### Monitoring Checklist

- [ ] Error rates normal
- [ ] Response times acceptable
- [ ] Database connection stable
- [ ] Memory usage stable
- [ ] CPU usage normal
- [ ] Disk space adequate
- [ ] API quota usage normal

---

## Useful Commands

```bash
# Frontend
cd client
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Check code quality

# Backend
cd ../server
npm install --production  # Install only production deps
NODE_ENV=production npm start  # Start in production mode

# Database
# MongoDB Atlas monitoring in dashboard
```

---

## Emergency Procedures

### Rollback

If deployment fails:

```bash
# Stop current process
# Ctrl+C or kill the process

# Switch to previous version
git checkout previous-tag

# Restart
npm start
```

### Database Recovery

If database is corrupted:

1. Use MongoDB Atlas backup
2. Restore to point-in-time
3. Verify data integrity
4. Notify users if data loss occurred

---

## Approval

- [ ] Frontend Lead Approval
- [ ] Backend Lead Approval
- [ ] DevOps/Infrastructure Approval
- [ ] Product Manager Approval
- [ ] Security Review (if required)

---

## Sign-Off

**Date:** _______________

**Deployed By:** _______________

**Approved By:** _______________

**Notes:** 
_______________________________________________
_______________________________________________
_______________________________________________

---

## Post-Deployment Review

**Date:** _______________

**Issues Encountered:** _______________________________________________

**Resolution Time:** _______________

**Performance:** _______________________________________________

**Next Steps:** _______________________________________________
- [ ] Error messages are user-friendly
- [ ] Loading states are shown
- [ ] Forms validate input
- [ ] Responsive design tested
- [ ] Images are optimized
- [ ] Build succeeds: `npm run build`

## Backend

- [ ] Environment variables documented
- [ ] All dependencies are in package.json
- [ ] No deprecated packages
- [ ] Start script works: `npm start`
- [ ] Server logs are informative
- [ ] Health check endpoint exists (optional)
- [ ] Rate limiting added (optional)

## Deployment

- [ ] Production environment chosen (Heroku, Vercel, AWS, etc.)
- [ ] Environment variables set in production
- [ ] Database backups configured
- [ ] Monitoring/logging setup
- [ ] CI/CD pipeline configured
- [ ] Domain/SSL certificate ready
- [ ] Resend API key configured and verified
- [ ] Groq API key for production

## Post-Deployment

- [ ] Test production URL works
- [ ] Monitor error logs
- [ ] Check API response times
- [ ] Verify email sending works
- [ ] Test user registration flow
- [ ] Validate all features in production
- [ ] Monitor database performance
- [ ] Set up alerts for errors

## Documentation

- [ ] API documentation is complete
- [ ] Deployment steps documented
- [ ] Emergency procedures documented
- [ ] Team knows how to rollback
- [ ] Support process is clear

## Optimization (Optional)

- [ ] Enable gzip compression
- [ ] Optimize database queries
- [ ] Add caching where appropriate
- [ ] Minify frontend assets
- [ ] Enable CDN for static assets
- [ ] Implement pagination for lists

## Monitoring & Maintenance

- [ ] Error tracking setup (Sentry, etc.)
- [ ] Performance monitoring setup
- [ ] Database backups automated
- [ ] Update dependencies regularly
- [ ] Security updates monitored
- [ ] Log retention policy set

---

## Rollback Plan

If deployment fails:
1. Revert to previous version
2. Check error logs
3. Fix issues locally
4. Test thoroughly
5. Redeploy

Keep previous deployment working until new one is verified.

---

**Deployment Date:** _______________
**Deployed By:** _______________
**Version:** _______________
**Notes:** 

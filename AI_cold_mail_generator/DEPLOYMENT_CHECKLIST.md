# Pre-Deployment Checklist

Use this checklist before deploying to production.

## Security Checks

- [ ] All sensitive keys are in `.env` (not in code)
- [ ] `.env` file is in `.gitignore`
- [ ] No console.log statements with sensitive data
- [ ] JWT_SECRET is a strong random string
- [ ] CORS origin is set to production domain
- [ ] NODE_ENV is set to `production`
- [ ] Password validation is enforced
- [ ] OTP expiration is set to 10 minutes
- [ ] Email service credentials are valid

## Code Quality

- [ ] No syntax errors
- [ ] No unused imports
- [ ] Error handling is implemented
- [ ] Input validation is present
- [ ] Code follows consistent style
- [ ] JSDoc comments added for functions
- [ ] README is up-to-date
- [ ] SETUP.md is accurate

## Testing

- [ ] Registration flow tested
- [ ] OTP verification tested
- [ ] Login flow tested
- [ ] Email generation tested
- [ ] Email history retrieval tested
- [ ] Error cases handled
- [ ] CORS working correctly
- [ ] API rate limiting considered (if needed)

## Database

- [ ] MongoDB Atlas cluster is created
- [ ] Whitelist production IP
- [ ] Database user created with correct permissions
- [ ] Connection string is correct
- [ ] Indexes are created (if needed)
- [ ] Backup strategy is in place

## Frontend

- [ ] No API hardcoded URLs (use .env)
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
- [ ] Email service production keys ready
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

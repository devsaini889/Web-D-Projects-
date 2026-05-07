# Contributing to AI Cold Mail Generator

Thank you for your interest in contributing! This guide will help you get started.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a new branch for your feature/fix
4. Make your changes
5. Push to your fork
6. Create a Pull Request

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b fix/your-bug-fix-name
```

Use descriptive branch names:
- `feature/user-profile` - New feature
- `fix/email-validation` - Bug fix
- `docs/setup-guide` - Documentation
- `style/format-code` - Code style improvements

### 2. Make Your Changes

- Write clear, readable code
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly

### 3. Commit Messages

Write clear commit messages:

```bash
git commit -m "Add user profile feature"
```

Good commit messages:
- Start with a capital letter
- Use imperative mood ("Add" not "Added")
- Keep it under 50 characters
- Reference issues when relevant: "Fix #123"

### 4. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a PR on GitHub with:
- Clear title describing the change
- Description of what changed and why
- Reference any related issues
- Screenshots for UI changes (if applicable)

## Code Style Guidelines

### JavaScript/Node.js

```javascript
// Use const/let, avoid var
const myVar = 'value';

// Use arrow functions when appropriate
const myFunction = () => {
  // code
};

// Use async/await instead of .then()
const getUser = async () => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error('Error:', error);
  }
};

// Use template literals
const message = `Hello, ${name}!`;

// Comment complex logic
// Validate email format before database query
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return false;
}
```

### React/JSX

```jsx
// Use functional components
function MyComponent() {
  const [state, setState] = useState(null);

  return (
    <div>
      {/* JSX here */}
    </div>
  );
}

// Use destructuring
const { name, email } = user;

// Use meaningful variable names
const isUserValid = checkUserValidity();
const handleSubmit = () => { /* ... */ };
```

## Testing

### Before submitting PR:

1. **Test locally:**
   ```bash
   cd server
   npm run dev
   
   # In another terminal
   cd client
   npm run dev
   ```

2. **Verify API endpoints:**
   - Use Postman or Thunder Client
   - Test happy path and error cases
   - Verify error messages are helpful

3. **Check for console errors:**
   - Browser console (Frontend)
   - Terminal output (Backend)

4. **Test in multiple browsers:**
   - Chrome
   - Firefox
   - Safari (if available)

## Code Review Process

1. Reviewers will check:
   - Code quality and style
   - Functionality correctness
   - Error handling
   - Security concerns
   - Documentation

2. Address review comments:
   - Make requested changes
   - Push new commits
   - Respond to comments
   - Mark conversations as resolved

3. Approval and merge:
   - Maintainers will approve when ready
   - Code will be merged to main branch
   - Your branch can be deleted

## Reporting Issues

### Bug Reports

Include:
- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, Node version, etc.)
- Error messages or screenshots

### Feature Requests

Include:
- Clear description of the feature
- Why it would be useful
- Possible implementation approach
- Any related issues or discussions

## Development Tips

### Debugging

**Backend:**
```javascript
// Add console logs
console.log('User:', user);

// Use Node debugger
// Add 'debugger;' statement and run with --inspect flag
node --inspect server.js
```

**Frontend:**
- Use React DevTools browser extension
- Use Network tab to inspect API calls
- Use Console for JavaScript errors

### Common Issues

**Port conflicts:**
```bash
# Find what's using port 3000
lsof -i :3000
kill -9 <PID>
```

**Module not found:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

**Cache issues:**
```bash
# Clear npm cache
npm cache clean --force
```

## Documentation

When adding features:
- Update README.md if API changes
- Add JSDoc comments to functions
- Include examples for new endpoints
- Update SETUP.md if setup process changes

Example JSDoc:
```javascript
/**
 * Generate an email using AI
 * @param {string} prompt - The user prompt for email generation
 * @returns {Promise<Object>} Generated email content
 * @throws {Error} If Groq API fails
 */
async function generateEmail(prompt) {
  // implementation
}
```

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- No discrimination or harassment
- Help others learn and grow
- Give credit where it's due

## Questions?

- Ask in pull requests
- Create discussions for design decisions
- Check existing issues for answers
- Read project documentation first

## Recognition

Contributors will be recognized in:
- GitHub contributor list
- Project README
- Release notes

Thank you for contributing! 🎉

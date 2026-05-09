# Contributing to AI Cold Mail Generator

Thank you for your interest in contributing! We welcome contributions from everyone.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Code Standards](#code-standards)
5. [Commit Messages](#commit-messages)
6. [Pull Request Process](#pull-request-process)
7. [Testing](#testing)
8. [Reporting Bugs](#reporting-bugs)
9. [Suggesting Features](#suggesting-features)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and professional.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing opinions and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, discrimination, or bullying
- Offensive or abusive language
- Deliberate intimidation
- Any form of violence or threats
- Sharing private information without consent

## Getting Started

### 1. Fork the Repository

Click the "Fork" button in the top right of the GitHub repository.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/ai-cold-mail-generator.git
cd ai-cold-mail-generator
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/ORIGINAL-OWNER/ai-cold-mail-generator.git
```

### 4. Keep Your Fork Updated

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### 5. Set Up Development Environment

Follow [SETUP.md](SETUP.md) for detailed instructions.

## Development Workflow

### Creating a Feature Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
```

### Branch Naming Conventions

Use descriptive branch names:

- **Features**: `feature/user-profile`, `feature/email-validation`
- **Bug Fixes**: `fix/cors-error`, `fix/otp-validation`
- **Documentation**: `docs/setup-guide`, `docs/api-endpoints`
- **Refactoring**: `refactor/auth-controller`, `refactor/api-utils`
- **Testing**: `test/add-email-tests`, `test/improve-coverage`
- **Performance**: `perf/optimize-queries`, `perf/reduce-bundle-size`

Format: `type/description-with-hyphens`

### Making Changes

1. **Make small, focused changes**
   - One feature or fix per branch
   - Easier to review and merge

2. **Test your changes**
   - Run the application: `npm run dev`
   - Test the feature manually
   - Add unit tests if applicable

3. **Keep code clean**
   - Follow existing code style
   - Use meaningful variable names
   - Add comments for complex logic
   - Remove console.log statements before committing

### Running Tests

```bash
# Frontend
cd client
npm run lint

# Backend
cd server
npm run lint  # If configured
```

## Code Standards

### JavaScript/Node.js

**Formatting:**
- 2 spaces for indentation
- Use `const` by default, `let` when reassignment is needed, avoid `var`
- Use arrow functions when appropriate
- Semicolons required

**Example:**
```javascript
// ✅ Good
const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

// ❌ Bad
var getUserById = function(id){
  let user = User.findById(id)
  return user
}
```

### React Components

**File Structure:**
```jsx
import React from 'react';
import './ComponentName.css';

// Type definitions if using TypeScript
interface Props {
  title: string;
  onClick: () => void;
}

// Component
const ComponentName = ({ title, onClick }) => {
  return (
    <div className="component">
      <h1>{title}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  );
};

export default ComponentName;
```

**Naming:**
- Use PascalCase for component names
- Use camelCase for functions and variables
- Use kebab-case for CSS classes

### CSS/Tailwind

- Use TailwindCSS utility classes
- Avoid custom CSS unless necessary
- Use consistent spacing (Tailwind scale)
- Mobile-first responsive design

```jsx
// ✅ Good
<div className="flex flex-col gap-4 md:flex-row md:gap-6">
  <h1 className="text-2xl font-bold">Title</h1>
</div>

// ❌ Bad
<div style={{ display: 'flex', gap: '16px' }}>
  <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Title</h1>
</div>
```

### Comments

Write clear comments for complex logic:

```javascript
// ✅ Good - explains WHY
// Use exponential backoff for retries to avoid overwhelming the server
const delay = Math.pow(2, attemptNumber) * 1000;

// ❌ Bad - explains WHAT (already obvious from code)
// Set delay to 2 to the power of attemptNumber times 1000
const delay = Math.pow(2, attemptNumber) * 1000;
```

## Commit Messages

### Format

```
<type>: <subject>

<body>

<footer>
```

### Type

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons)
- `refactor`: Code refactoring without changing functionality
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Dependency updates, build changes

### Subject Line

- Use imperative mood: "add" not "added" or "adds"
- Don't capitalize first letter
- No period (.) at the end
- Keep under 50 characters
- Reference issues when relevant: "fix #123"

### Body

- Explain **why** the change was made
- Explain **what** problem it solves
- Reference related issues: "Fixes #123", "Related to #456"
- Keep lines under 72 characters
- Leave blank line between subject and body

### Footer

- Reference issue numbers: "Fixes #123", "Closes #456"
- Breaking changes: "BREAKING CHANGE: description"

### Examples

```bash
# ✅ Good
feat: add email history retrieval endpoint

Add new GET /api/ai/email-history endpoint that retrieves
all previously generated emails for the authenticated user.

Implements pagination to handle large number of emails.
Closes #42

# ✅ Good
fix: validate prompt length in email generation

Previously, prompts longer than 2000 characters would be sent
to Groq API and fail. Now we validate on the server before
making the API request, providing a better error message.

Fixes #38

# ❌ Bad
updated code

# ❌ Bad
Fix: Validation stuff and API calls updated

# ❌ Bad
feat: add new feature.
```

## Pull Request Process

### Before Creating PR

1. **Sync with main**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test everything**
   - `npm run dev` (frontend works)
   - Check backend is working
   - Manually test your feature

3. **Code review yourself**
   - Read through your own changes
   - Look for obvious issues
   - Check code style consistency

### Creating the PR

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create PR on GitHub**
   - Click "New Pull Request" button
   - Select your branch
   - Compare with `main` branch

3. **Fill out PR template**

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123

## How to Test
1. Step 1
2. Step 2
3. Step 3

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] Comments added for complex logic
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Commits follow the conventional format
```

### PR Review Process

- Address all feedback
- Make requested changes in new commits
- Request review again when done
- Be open to suggestions

### PR Merge

Once approved:
1. Maintainer will merge to main
2. Your branch will be deleted
3. Celebrate! 🎉

## Testing

### Manual Testing

1. **Test your feature**
   - Run `npm run dev`
   - Test in browser
   - Check console for errors

2. **Test edge cases**
   - Empty inputs
   - Very long inputs
   - Invalid data
   - Network errors

3. **Test in both browsers**
   - Chrome
   - Firefox
   - Safari

### Automated Testing (if applicable)

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

## Reporting Bugs

### Before Reporting

- Check [GitHub Issues](https://github.com/devsaini889/ai-cold-mail-generator/issues)
- Search for similar issues
- Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

### Creating a Bug Report

**Title:** Concise description
```
"Login button doesn't work on mobile"
```

**Description:**
```markdown
## Bug Description
What happens when you encounter the bug?

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen?

## Actual Behavior
What actually happens?

## Screenshots/Videos
If applicable, add screenshots

## Environment
- OS: Windows 10
- Browser: Chrome 120
- Node.js: v18.0.0
- npm: 9.0.0

## Additional Context
Any other information relevant to the bug
```

## Suggesting Features

### Before Suggesting

- Check [GitHub Issues](https://github.com/devsaini889/ai-cold-mail-generator/issues)
- Make sure feature doesn't already exist

### Creating a Feature Request

**Title:** Clear description
```
"Add ability to customize email tone (formal/casual)"
```

**Description:**
```markdown
## Feature Description
What would you like to see added?

## Use Case
Why would this be useful?

## Proposed Solution
How should this feature work?

## Alternatives Considered
Other approaches to solve the problem?

## Additional Context
Any other relevant information
```

## Resources

- [Setup Guide](SETUP.md)
- [Troubleshooting](TROUBLESHOOTING.md)
- [Deployment Checklist](DEPLOYMENT_CHECKLIST.md)
- [README](README.md)

## Questions?

- Open a [GitHub Discussion](https://github.com/devsaini889/ai-cold-mail-generator/discussions)
- Email: your-email@example.com
- Check [Troubleshooting Guide](TROUBLESHOOTING.md)

## Thank You! 🙏

Thank you for contributing to make AI Cold Mail Generator better for everyone!

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

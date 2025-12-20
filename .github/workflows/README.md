# GitHub Actions Workflows

This directory contains GitHub Actions workflows for CI/CD.

## Frontend Tests

The `frontend-tests.yml` workflow runs frontend unit tests using Vitest.

### Triggers

- **Push** to `main` or `develop` branches when frontend files change
- **Pull Requests** to `main` or `develop` branches when frontend files change

### What it does

1. Checks out the code
2. Sets up Node.js 20 with npm cache
3. Installs dependencies using `npm ci`
4. Runs frontend tests using `npm run test:run`
5. Generates coverage report (optional, won't fail if coverage tools aren't configured)
6. Uploads test results and coverage as artifacts

### Path filters

The workflow only runs when these files change:
- `src/**` - Source code
- `package.json` / `package-lock.json` - Dependencies
- `vite.config.js` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `.github/workflows/frontend-tests.yml` - The workflow itself

### Artifacts

Test results and coverage reports are uploaded as artifacts and retained for 7 days.


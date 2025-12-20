# E2E Tests

End-to-end tests for BSUIRBet application using Cypress.

## Prerequisites

1. Install dependencies:
   ```bash
   npm install
   ```

2. **Make sure the backend API is running:**
   ```bash
   # From backend directory
   npm run dev
   ```
   The backend should be running on `http://localhost:3001`

3. **Make sure the frontend development server is running:**
   ```bash
   # From project root
   npm run dev
   ```
   The frontend should be running on `http://localhost:5173`

**Important:** These tests use **real API endpoints**, not mocks. Both the frontend and backend must be running for tests to pass.

## Running Tests

### Open Cypress Test Runner (Interactive Mode)

```bash
npm run cypress:open
```

This opens the Cypress Test Runner where you can:
- See all tests
- Run tests interactively
- Debug tests
- Watch tests run in real-time

### Run Tests Headlessly (CI Mode)

```bash
npm run cypress:run
```

This runs all tests in headless mode, suitable for CI/CD pipelines.

### Run Specific Test File

```bash
npx cypress run --spec "cypress/e2e/homepage.cy.ts"
```

## Test Structure

```
e2e-tests/
├── cypress/
│   ├── e2e/              # Test files
│   │   └── homepage.cy.ts
│   ├── fixtures/         # Mock data
│   │   ├── games.json
│   │   ├── jackpots.json
│   │   ├── providers.json
│   │   └── categories.json
│   └── support/          # Support files
│       ├── commands.ts    # Custom commands
│       └── e2e.ts         # Global setup
├── cypress.config.ts      # Cypress configuration
└── package.json
```

## Configuration

The Cypress configuration is in `cypress.config.ts`. Key settings:

- **baseUrl**: `http://localhost:5173` (Vite dev server default)
- **viewportWidth**: 1280px
- **viewportHeight**: 720px

To change the base URL, update `cypress.config.ts` or set the `CYPRESS_baseUrl` environment variable.

## Writing Tests

### Example Test

```typescript
describe('Feature Tests', () => {
  beforeEach(() => {
    // Setup before each test
    cy.visit('/');
  });

  it('should do something', () => {
    cy.get('.element').should('be.visible');
    cy.get('.button').click();
  });
});
```

### Custom Commands

Custom commands are available in `cypress/support/commands.ts`:

- `cy.waitForApi()` - Wait for real API calls to complete

### Fixtures

Fixtures are available in `cypress/fixtures/` but are **not used for mocking** in these tests. 
The tests use **real API endpoints** to ensure end-to-end validation.

Note: Fixtures may be used for other purposes (e.g., test data for POST requests) but API responses are not mocked.

## Debugging

1. **Use Cypress Test Runner**: `npm run cypress:open` for interactive debugging
2. **Use `.debug()`**: Add `cy.debug()` in your test to pause execution
3. **Use browser DevTools**: Open browser DevTools in Cypress Test Runner
4. **Screenshots**: Screenshots are automatically taken on test failures

## CI/CD Integration

For CI/CD, use:

```bash
npm run cypress:run
```

This runs tests headlessly and generates:
- Test results
- Screenshots (on failures)
- Videos (if enabled)

## Troubleshooting

### Tests fail with "Connection refused"

- Make sure the frontend dev server is running on port 5173
- Check `cypress.config.ts` baseUrl setting

### API calls fail

- **Make sure the backend API is running** on `http://localhost:3001`
- Check that the backend database is set up and seeded with test data
- Verify the API endpoints are accessible (check network tab in browser)
- Ensure CORS is properly configured if accessing from different origin

### Elements not found

- Check selectors match actual DOM structure
- Use Cypress Test Runner to inspect elements
- Check if elements are loaded asynchronously (use `cy.wait()`)


# Integration Tests

This directory contains integration tests for the backend API.

## Setup

### 1. Test Database

The tests use a separate test database. Configure it using environment variables:

```bash
TEST_POSTGRES_HOST=localhost
TEST_POSTGRES_PORT=5432
TEST_POSTGRES_USER=bsuirbet
TEST_POSTGRES_PASSWORD=bsuirbet123
TEST_POSTGRES_DB=bsuirbet_test
```

If these are not set, the tests will fall back to the regular `POSTGRES_*` environment variables with a database name of `bsuirbet_test`.

### 2. Create Test Database

Make sure the test database exists:

```sql
CREATE DATABASE bsuirbet_test;
```

Or use the same database as development (tests will clean it before each test).

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Structure

- `test-data-source.ts` - Test database configuration
- `test-setup.ts` - Database setup/teardown utilities
- `jest-setup.ts` - Jest configuration hooks
- `mocks/` - Mock implementations (e.g., Keycloak authentication)
- `__tests__/` - Actual test files

## Test Database Behavior

- The test database uses `synchronize: true` to automatically create tables
- `dropSchema: true` ensures a clean state before each test run
- Each test suite cleans the database in `beforeEach` to ensure isolation

## Mocking

- Keycloak authentication is automatically mocked in tests
- The `AppDataSource` is mocked to use the test database instead of production


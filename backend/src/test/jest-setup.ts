import { setupTestDatabase, closeTestDatabase } from './test-setup';

// Setup before all tests - this runs before any test files
beforeAll(async () => {
  // Initialize test database early so mocks can use it
  await setupTestDatabase();
}, 30000); // 30 second timeout for database initialization

// Cleanup after all tests
afterAll(async () => {
  await closeTestDatabase();
});


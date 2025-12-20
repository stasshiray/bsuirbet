import { TestDataSource } from './test-data-source';
import { DataSource } from 'typeorm';

let testDataSource: DataSource | null = null;

/**
 * Initialize test database connection
 */
export async function setupTestDatabase(): Promise<DataSource> {
  if (testDataSource && testDataSource.isInitialized) {
    return testDataSource;
  }

  testDataSource = TestDataSource;
  
  if (!testDataSource.isInitialized) {
    await testDataSource.initialize();
  }

  return testDataSource;
}

/**
 * Close test database connection
 */
export async function closeTestDatabase(): Promise<void> {
  if (testDataSource && testDataSource.isInitialized) {
    await testDataSource.destroy();
    testDataSource = null;
  }
}

/**
 * Clean all tables in test database
 */
export async function cleanDatabase(): Promise<void> {
  await testDataSource?.dropDatabase();
  await testDataSource?.synchronize();
}

/**
 * Get test data source instance
 */
export function getTestDataSource(): DataSource {
  if (!testDataSource || !testDataSource.isInitialized) {
    throw new Error('Test database not initialized. Call setupTestDatabase() first.');
  }
  return testDataSource;
}


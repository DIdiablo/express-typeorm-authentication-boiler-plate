import { AppDataSource } from '../databases/data-source';

beforeAll(async () => {
  // Set longer timeout for database operations
  jest.setTimeout(10000);

  // Create a test database connection
  try {
    await AppDataSource.initialize();
    console.log('Database connected for testing');
  } catch (error) {
    console.error('Error connecting to test database:', error);
  }
});

afterAll(async () => {
  // Close database connection
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    console.log('Database connection closed');
  }

  // Add a small delay to ensure all operations are complete
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

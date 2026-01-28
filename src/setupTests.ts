import '@testing-library/jest-dom';

// Set up MSW server for API mocking
try {
    const { server } = require('./__mocks__/server');

    // Establish API mocking before all tests.
    beforeAll(() => {
        server.listen({ onUnhandledRequest: 'warn' });
    });

    // Reset any request handlers that we may add during the tests,
    // so they don't affect other tests.
    afterEach(() => {
        server.resetHandlers();
    });

    // Clean up after the tests are finished.
    afterAll(() => {
        server.close();
    });
} catch (e) {
    // MSW not available or failed to load
    // Log error but don't fail tests that don't need API mocking
    console.warn('MSW setup failed:', e.message);
}

import '@testing-library/jest-dom';

// Set up MSW for API mocking (optional - only if available)
// Polyfills (TextEncoder/TextDecoder) are loaded in setupPolyfills.ts which runs first
let mswEnabled = false;

try {
    // Check if TextEncoder is available (required by MSW)
    if (typeof globalThis.TextEncoder !== 'undefined') {
        const { server } = require('./__mocks__/server');
        mswEnabled = true;
        
        // Establish API mocking before all tests.
        beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
        
        // Reset any request handlers that we may add during the tests,
        // so they don't affect other tests.
        afterEach(() => server.resetHandlers());
        
        // Clean up after the tests are finished.
        afterAll(() => server.close());
    }
} catch (error) {
    // MSW setup failed - tests that don't need API mocking will still work
    // This allows tests like VolumeControls, SongTitle, etc. to run without MSW
    console.warn('MSW not available - API mocking disabled. Tests that don\'t need API calls will still work.');
}

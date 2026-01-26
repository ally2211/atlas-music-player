// Lazy load MSW server to ensure polyfills are ready
let _server: any = null;

export function getServer() {
    if (!_server) {
        // Ensure TextEncoder/TextDecoder are available
        if (typeof globalThis.TextEncoder === 'undefined') {
            const { TextEncoder, TextDecoder } = require('util');
            globalThis.TextEncoder = TextEncoder;
            globalThis.TextDecoder = TextDecoder;
        }
        
        const { setupServer } = require('msw/node');
        const { handlers } = require('./handlers');
        _server = setupServer(...handlers);
    }
    return _server;
}

// Export server proxy that lazy-loads
export const server = new Proxy({} as any, {
    get(_target, prop) {
        return getServer()[prop];
    }
});

// Polyfill Web APIs for MSW in Node.js/Jest environment
// Set up TextEncoder/TextDecoder BEFORE any other imports that might need them
const { TextEncoder, TextDecoder } = require('util');

// Make TextEncoder/TextDecoder available globally FIRST (required by MSW)
globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;

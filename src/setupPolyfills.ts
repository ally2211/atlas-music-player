// Polyfill Web APIs for MSW in Node.js/Jest environment
// TextEncoder and TextDecoder are required by MSW
import { TextEncoder, TextDecoder } from 'util';

// Make TextEncoder/TextDecoder available globally BEFORE any MSW imports
// This must happen before setupTests.ts imports MSW
globalThis.TextEncoder = TextEncoder as any;
globalThis.TextDecoder = TextDecoder as any;

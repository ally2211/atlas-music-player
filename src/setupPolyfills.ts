// Polyfill Web APIs for MSW in Node.js/Jest environment
// Order matters: TextEncoder/TextDecoder -> Web Streams -> BroadcastChannel -> fetch APIs

// 1. Set up TextEncoder/TextDecoder FIRST (required by MSW)
const { TextEncoder, TextDecoder } = require('util');
globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;

// 2. Set up Web Streams APIs BEFORE loading undici (undici needs ReadableStream)
if (typeof globalThis.ReadableStream === 'undefined') {
    try {
        // Node.js 18+ has Web Streams API
        const { TransformStream, ReadableStream, WritableStream } = require('stream/web');
        globalThis.TransformStream = TransformStream;
        globalThis.ReadableStream = ReadableStream;
        globalThis.WritableStream = WritableStream;
    } catch (e) {
        console.warn('Web Streams APIs not available from stream/web');
    }
}

// 3. Polyfill BroadcastChannel (required by MSW)
if (typeof globalThis.BroadcastChannel === 'undefined') {
    // Simple BroadcastChannel polyfill for Node.js
    globalThis.BroadcastChannel = class BroadcastChannel {
        constructor(name) {
            this.name = name;
            this.listeners = [];
        }
        postMessage(message) {
            // No-op in test environment
        }
        addEventListener(type, listener) {
            if (type === 'message') {
                this.listeners.push(listener);
            }
        }
        removeEventListener(type, listener) {
            if (type === 'message') {
                this.listeners = this.listeners.filter(l => l !== listener);
            }
        }
        close() {
            this.listeners = [];
        }
    };
}

// 4. Now load undici and set up fetch APIs
const undici = require('undici');

// Set on globalThis so it's available in jsdom
globalThis.fetch = undici.fetch;
globalThis.Request = undici.Request;
globalThis.Response = undici.Response;
globalThis.Headers = undici.Headers;

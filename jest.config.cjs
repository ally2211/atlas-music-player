module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',

    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

    setupFiles: ['<rootDir>/src/setupPolyfills.ts'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

    // Enable fetch in jsdom environment
    testEnvironmentOptions: {
        customExportConditions: [''],
    },

    // Provide global fetch from Node.js (Node 18+)
    globals: {
        'ts-jest': {
            tsconfig: {
                lib: ['ES2020', 'DOM'],
            },
        },
    },

    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/src/__mocks__/fileMock.js',
    },
};

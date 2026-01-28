module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',

    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: {
                lib: ['ES2020', 'DOM'],
            },
        }],
        // Transform ES modules from MSW dependencies
        'node_modules/(msw|@mswjs|until-async)/.*\\.js$': ['ts-jest', {
            tsconfig: false,
            useESM: false,
        }],
    },

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

    setupFiles: ['<rootDir>/src/setupPolyfills.ts'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

    // Enable fetch in jsdom environment
    testEnvironmentOptions: {
        customExportConditions: [''],
    },

    // Don't ignore MSW and its dependencies - transform them
    transformIgnorePatterns: [
        'node_modules/(?!(msw|@mswjs|until-async)/)',
    ],

    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/src/__mocks__/fileMock.js',
    },
};

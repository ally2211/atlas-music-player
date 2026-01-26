module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',

    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/src/__mocks__/fileMock.js',
    },
};

module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '\\.svg$': '<rootDir>/__mocks__/svgMock.js'
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
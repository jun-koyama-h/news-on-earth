module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.module\\.css$': 'identity-obj-proxy',
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '\\.svg$': '<rootDir>/__mocks__/svgMock.js'
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    transformIgnorePatterns: [
        "node_modules/(?!react-leaflet|@react-leaflet|leaflet|その他の変換対象のモジュール)",
    ],
};
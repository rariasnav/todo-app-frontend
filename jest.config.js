module.exports = {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    transformIgnorePatterns: [
        "/node_modules/(?!@testing-library)",
    ],
};
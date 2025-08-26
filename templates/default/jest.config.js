module.exports = {
  collectCoverageFrom: [
    "./src/**/*.ts"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testMatch: [
    "**/*.spec.ts"
  ],
  setupFiles: ["jest-canvas-mock"],
  testEnvironment: "jsdom",
  moduleFileExtensions: [
    "js",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],
  modulePathIgnorePatterns: [
    "node_modules"
  ],
  moduleNameMapper: {
    // Todo: Lmao
    "^uuid$": require.resolve('./node_modules/.pnpm/uuid@8.3.2/node_modules/uuid'),
  }
};

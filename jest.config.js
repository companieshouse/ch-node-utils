
module.exports = {
  roots: ["<rootDir>"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
  collectCoverageFrom: [
    "./src/**/*.ts"
  ],
  coveragePathIgnorePatterns: [
    "/src/bin/",
    "/src/model/"
  ],
  testEnvironment: "node",
  testTimeout: 25000,
  verbose: true,
  testMatch: ["**/test/**/*.test.[jt]s"],
  transform: {
    "^.+\\.ts$": ["@swc/jest"]
  },
  globalSetup: "./test/setup.ts",
};

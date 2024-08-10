const nextJest = require("next/jest");

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

   // Indicates whether the coverage information should be collected while executing the test
   collectCoverage: true,

   // An array of glob patterns indicating a set of files for which coverage information should be collected
   collectCoverageFrom: ['./src/contexts/**/*.js'],
 
   // The directory where Jest should output its coverage files
   coverageDirectory: 'coverage',

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "babel",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ["json", "text", "lcov", "clover"],

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    "./src/contexts/": {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/application/**',
    '!**/tests/**'
  ],
  coverageDirectory: 'coverage',
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};
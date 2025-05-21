module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/js/**/*.js'
  ],
  coverageDirectory: 'coverage',
  testMatch: [
    '**/tests/**/*.test.js'
  ],
  setupFilesAfterEnv: ['./tests/setup.js']
}; 
/** @type {import('jest').Config} */
const config = {
  ...require('./jest.config'),
  testMatch: ['**/*.test.ts'],
}

module.exports = config

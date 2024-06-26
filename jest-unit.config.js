/** @type {import('jest').Config} */
const config = {
  ...require('./jest.config'),
  testMatch: ['**/*.spec.ts'],
}

module.exports = config

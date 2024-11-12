const { createDefaultPreset } = require('ts-jest')

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  ...createDefaultPreset(),
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
}

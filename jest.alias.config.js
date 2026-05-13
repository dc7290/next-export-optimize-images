const { createDefaultPreset } = require('ts-jest')

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  ...createDefaultPreset(),
  testMatch: ['**/__tests__/e2e-alias/**/*.test.[jt]s?(x)'],
  // Each fixture build is heavy and they're independent files; let Jest parallelize across them.
  maxWorkers: '50%',
}

/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  testEnvironment: 'node',
  testRegex: 'tests/.*\\.test\\.js$',
};

module.exports = config;

/**
 * A configuration for commitlint.
 * @see {@link https://commitlint.js.org/#/} for details.
 */

const typeEnum = require('./commit-types.config').map(({ type }) => type)
const scopeEnum = require('./changelog.config').scopes
const subjectMinLength = require('./changelog.config').minMessageLength ?? 3
const subjectMaxLength = require('./changelog.config').maxMessageLength ?? 64

module.exports = {
  extends: ['@commitlint/config-conventional'],
  /**
   * @see {@link https://commitlint.js.org/#/reference-rules} for rule details.
   */
  rules: {
    'type-enum': [2, 'always', typeEnum],
    'scope-enum': [2, 'always', scopeEnum],
    'subject-min-length': [2, 'always', subjectMinLength],
    'subject-max-length': [2, 'always', subjectMaxLength],
    'body-max-length': [0], // releaseコミットがエラーになるため無効化する
    'body-max-line-length': [0], // releaseコミットがエラーになるため無効化する
    'footer-max-length': [0], // releaseコミットがエラーになるため無効化する
    'footer-max-line-length': [0], // releaseコミットがエラーになるため無効化する
  },
}

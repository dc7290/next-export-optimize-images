/**
 * This is a configuration for git-cz.
 *
 * @see {@link https://github.com/streamich/git-cz#custom-config} for documentation
 * @see {@link https://github.com/streamich/git-cz/blob/master/lib/defaults.js} for default configs.
 */

const types = require('./commit-types.config')

module.exports = {
  /**
   * コミットメッセージに絵文字を含めないか
   */
  disableEmoji: false,
  /**
   * コミットメッセージの題目の書式
   */
  format: "{type}{scope}: {emoji}{subject}",
  /**
   * コミット時に選択可能な型
   */
  list: types.map(({ type }) => type),
  /**
   * コミットメッセージ最大文字数
   */
  // maxMessageLength: 64,
  /**
   * コミットメッセージ最小文字数
   */
  // minMessageLength: 3,
  /**
   * コミット時に入力する項目
   */
  questions: [
    "type", // 型
    "subject", // コミットの題名
    "body", // コミットの本文
    "breaking", // breaking changeの内容
    "issues", // クローズするGitHub issues
  ],
  /**
   * 各型の設定
   */
  types: Object.fromEntries(types.map(({ type, description, emoji }) => [type, { description, emoji, value: type }])),
  /**
   * BREAKING CHANGEに表示する絵文字
   */
  breakingChangePrefix: "🧨",
  /**
   * Closesに表示する絵文字
   */
  closedIssuePrefix: "✅",
}

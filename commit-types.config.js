/**
 * @typedef {Object} Type conventional commitsの型の設定
 * @property {string} type conventional commitsの型
 * @property {"major" | "minor" | "patch" | undefined } [release] セマンティックバージョンの上げ方。undefinedはリリースされません。
 * @property {string} description git-czに表示される説明文
 * @property {string} emoji git-czで使う絵文字
 * @property {string | undefined} [section] changelogに表示する見出し
 * @property {boolean | undefined} [hidden] changelogに表示するか否か
 */

/**
 * @type {Array.<Type>}
 */
module.exports = [
  {
    type: "feat", // 機能追加
    release: "minor",
    description: "A new feature",
    emoji: "🚀",
    section: "Features",
    hidden: false,
  },
  {
    type: "fix", // バグ修正
    release: "patch",
    description: "A bug fix",
    emoji: "🐛",
    section: "Bug Fixes",
    hidden: false,
  },
  {
    type: "sec", // 脆弱性の解消
    release: "patch",
    description: "A vulnerability fix",
    emoji: "👮‍",
    section: "Security",
    hidden: false,
  },
  {
    type: "perf", // パフォーマンスのみの改善
    release: "patch",
    description: "A code change that improves performance",
    emoji: "⚡️",
    section: "Performance Improvements",
    hidden: false,
  },
  {
    type: "refactor", // 機能追加やバグ修正を伴わないリファクタリング
    release: undefined,
    description: "A code change that neither fixes a bug or adds a feature",
    emoji: "💡",
    section: "Code Refactoring",
    hidden: true,
  },
  {
    type: "docs", // ドキュメントのみの変更
    release: undefined,
    description: "Documentation only changes",
    emoji: "✏️",
    section: `Documentation`,
    hidden: false,
  },
  {
    type: "release", // リリースコミット
    release: undefined,
    description: "Create a release commit",
    emoji: "🏹",
    hidden: true,
  },
  {
    type: "style", // コーディングスタイル関連の修正
    release: undefined,
    description: "Markup, white-space, formatting, missing semi-colons...",
    emoji: "💄",
    section: "Styles",
    hidden: true,
  },
  {
    type: "test", // テストの追加変更
    release: undefined,
    description: "Adding missing tests",
    emoji: "💍",
    section: "Tests",
    hidden: false,
  },
  {
    type: "ci", // CI関連の変更
    release: undefined,
    description: "CI related changes",
    emoji: "🎡",
    section: `Continuous Integration`,
    hidden: false,
  },
  {
    type: "chore", // ビルドプロセスや補助ツールの変更
    release: undefined,
    description: "Build process or auxiliary tool changes",
    emoji: "🤖",
    section: `Chore`,
    hidden: true,
  },
];

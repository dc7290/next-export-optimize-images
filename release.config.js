/**
 * A configuration file for semantic-release
 *
 * @see {@link https://semantic-release.gitbook.io/semantic-release/} for about semantic-release.
 * @see {@link https://semantic-release.gitbook.io/semantic-release/usage/configuration} for configuration details.
 * @see {@link https://github.com/semantic-release/semantic-release/blob/971a5e0d16f1a32e117e9ce382a1618c8256d0d9/lib/get-config.js#L56} for about default config.
 */

const types = require('./commit-types.config')

/**
 * GitHubのデフォルトブランチ
 */
const defaultBranch = 'release'

/**
 * changelogを書き出すファイル名
 */
const changelogFile = 'CHANGELOG.md'

module.exports = {
  /**
   * リリース対象となるGitブランチ
   *
   * @see https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration
   */
  branches: [defaultBranch],
  /**
   * Gitタグのフォーマット。Lodashのテンプレートが使えます。
   * multi-semantic-releaseを使った場合は、この設定は無視されます。
   */
  tagFormat: 'v${version}',
  /**
   * 実行するプラグイン
   */
  plugins: [
    /**
     * conventional-changelogでコミットを解析します。
     * @see https://github.com/semantic-release/commit-analyzer
     */
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          { breaking: true, release: 'major' },
          { revert: true, release: 'patch' },
          ...types.flatMap(({ type, release }) => (release ? [{ type, release }] : [])),
        ],
      },
    ],
    /**
     * conventional-changelogでchangelogコンテンツを生成します。
     * @see https://github.com/semantic-release/release-notes-generator
     */
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: types.map(({ type, section, hidden }) => ({
            type,
            section,
            hidden: hidden ?? true,
          })),
        },
      },
    ],
    /**
     * changelogコンテンツをもとにchangelogFileを生成します。
     * @see https://github.com/semantic-release/changelog
     */
    [
      '@semantic-release/changelog',
      {
        changelogFile,
      },
    ],
    /**
     * package.jsonのバージョンを更新したり、npmパッケージを公開します。
     * @see https://github.com/semantic-release/npm
     */
    [
      '@semantic-release/npm',
      {
        // npmに公開するかどうか
        npmPublish: false,
      },
    ],
    /**
     * リリース時に生成したアセットをGitリポジトリにコミットします。
     * @see https://github.com/semantic-release/git
     */
    [
      '@semantic-release/git',
      {
        // コミット対象のファイル
        assets: [
          'package.json', // versionフィールドの変更をコミットするため
          changelogFile, // changelogFileの変更をコミットするため
        ],
        // コミットメッセージ
        message: 'release: 🏹 ${nextRelease.gitTag} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    /**
     * GitHub releaseを公開し、リリースされたプルリクエストやissueにコメントを残します。assetsをreleasesにアップロードすることもできます。
     * @see https://github.com/semantic-release/github
     */
    [
      '@semantic-release/github',
      {
        // 関連するissueやPRにつけるラベル
        releasedLabels: ['released', 'released-in-${nextRelease.gitTag}'],
        // 関連するissueやPRに残すコメント
        successComment:
          "🎉 This ${issue.pull_request ? 'pull request' : 'issue'} is included in version ${nextRelease.gitTag}.",
      },
    ],
  ],
}

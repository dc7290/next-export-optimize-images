/** Default deep-path location of Next's Image component. Stable across Next 14 / 15 / 16. */
const DEFAULT_NEXT_IMAGE_DIST_PATH = 'next/dist/shared/lib/image-external'

const EMPTY_STUB = 'next-export-optimize-images/dist/empty'
const TURBO_REMOTE_IMAGE = 'next-export-optimize-images/dist/components/client/turbo-remote-image'
const SERVER_REMOTE_IMAGE = 'next-export-optimize-images/remote-image'
const CLIENT_IMAGE = 'next-export-optimize-images/image'
const SKIP_ISSUER_REGEX = /[\\/]node_modules[\\/]next-export-optimize-images[\\/]/

// Rewrites `next/image` to a different specifier when the issuer is outside
// `next-export-optimize-images` itself. Letting the package's own internal
// `next/image` imports through unchanged is what breaks the otherwise-infinite
// recursion when `unstable_nextImageAlias` is enabled.
class IssuerScopedNextImageAliasPlugin {
  private from: string
  private to: string
  private skipIssuerRegex: RegExp
  constructor(opts: { from: string; to: string; skipIssuerRegex: RegExp }) {
    this.from = opts.from
    this.to = opts.to
    this.skipIssuerRegex = opts.skipIssuerRegex
  }
  // biome-ignore lint/suspicious/noExplicitAny: webpack types aren't worth pulling in here
  apply(compiler: any) {
    // biome-ignore lint/suspicious/noExplicitAny: same as above
    compiler.hooks.normalModuleFactory.tap('NextImageAlias', (factory: any) => {
      // biome-ignore lint/suspicious/noExplicitAny: same as above
      factory.hooks.beforeResolve.tap('NextImageAlias', (resolveData: any) => {
        if (!resolveData || resolveData.request !== this.from) return
        const issuer: string = resolveData.contextInfo?.issuer ?? ''
        if (this.skipIssuerRegex.test(issuer)) return
        resolveData.request = this.to
      })
    })
  }
}

/**
 * When truthy, every `import Image from 'next/image'` in the project is
 * automatically resolved to `next-export-optimize-images/remote-image`,
 * so existing code that mixes remote URLs and local images works without
 * changing imports.
 *
 * Pass `true` for default behaviour, or an options object to customise.
 *
 * The component dispatches at render time: any `src` string matching
 * `^(https?:)?//` is registered for build-time download (the same path as
 * `<RemoteImage>`); everything else (`StaticImageData`, local paths,
 * `data:` URIs) renders as a regular local image.
 *
 * Works on both webpack (Next 14 / 15 / 16) and Turbopack (Next 15 / 16);
 * the active bundler picks the right path automatically.
 *
 * Caveats:
 * - The alias is global. Every `next/image` import is remapped, including
 *   those inside third-party packages. Most usage keeps working thanks to
 *   the runtime dispatch, but code that compares `Image` by reference or
 *   inspects `Image.name` will observe a different component.
 * - The `unstable_` prefix is real. The Turbopack path uses an internal
 *   Next.js module path (`next/dist/shared/lib/image-external`) that is
 *   not part of Next's public API and may move between versions. Use
 *   `nextImageDistPath` to override if Next moves the file without
 *   waiting for this package to update.
 */
export type UnstableNextImageAliasOption =
  | boolean
  | {
      /**
       * Override the Next.js internal module path that the Turbopack alias
       * target imports `Image` from. Defaults to
       * `next/dist/shared/lib/image-external` — the path Next has used since
       * Next 14. Only set this if a future Next release moves the file.
       *
       * When set to a path that differs from the default, this package adds
       * a `turbopack.resolveAlias` entry so its own pre-built `turbo-image`
       * imports are redirected to the configured path without rebuilding.
       */
      nextImageDistPath?: string
    }

type Normalized = { enabled: boolean; nextImageDistPath: string }

const normalize = (opt: UnstableNextImageAliasOption | undefined): Normalized => ({
  enabled: !!opt,
  nextImageDistPath:
    typeof opt === 'object' && opt?.nextImageDistPath ? opt.nextImageDistPath : DEFAULT_NEXT_IMAGE_DIST_PATH,
})

type TurbopackAliasEntry = string | { browser: string }

/**
 * Build the `turbopack.resolveAlias` entries needed to route `next/image`
 * through the manifest-writing wrapper. Returns an empty object when the
 * option is disabled.
 *
 * The lazy `require('node:fs'|'node:crypto'|'node:path')` inside the wrapper's
 * manifest-write branch fails Turbopack's browser resolve; the browser-side
 * entries here redirect those specifiers to an empty stub. The runtime
 * `typeof window === 'undefined'` guard keeps them from ever being called.
 */
export const buildTurbopackAlias = (
  opt: UnstableNextImageAliasOption | undefined
): Record<string, TurbopackAliasEntry> => {
  const { enabled, nextImageDistPath } = normalize(opt)
  if (!enabled) return {}
  return {
    'next/image': TURBO_REMOTE_IMAGE,
    fs: { browser: EMPTY_STUB },
    crypto: { browser: EMPTY_STUB },
    path: { browser: EMPTY_STUB },
    ...(nextImageDistPath !== DEFAULT_NEXT_IMAGE_DIST_PATH
      ? { [DEFAULT_NEXT_IMAGE_DIST_PATH]: nextImageDistPath }
      : {}),
  }
}

/**
 * Wire the webpack-side of `unstable_nextImageAlias`: register the
 * issuer-scoped plugin that rewrites `next/image` (server build → manifest-
 * writing wrapper, client build → leaner loader-setting wrapper) and add a
 * `resolve.fallback` for the node built-ins as a defence against any client
 * graph that still reaches a file with `require('node:fs')`. Mutates the
 * webpack config in place. No-ops when the option is disabled.
 */
export const applyWebpackAlias = (
  // biome-ignore lint/suspicious/noExplicitAny: webpack types aren't worth pulling in here
  config: any,
  option: { isServer: boolean },
  opt: UnstableNextImageAliasOption | undefined
): void => {
  const { enabled } = normalize(opt)
  if (!enabled) return

  config.plugins.push(
    new IssuerScopedNextImageAliasPlugin({
      from: 'next/image',
      to: option.isServer ? SERVER_REMOTE_IMAGE : CLIENT_IMAGE,
      skipIssuerRegex: SKIP_ISSUER_REGEX,
    })
  )

  if (!option.isServer) {
    config.resolve = config.resolve ?? {}
    config.resolve.fallback = {
      ...(config.resolve.fallback ?? {}),
      fs: false,
      crypto: false,
      path: false,
    }
  }
}

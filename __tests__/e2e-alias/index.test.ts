import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'

const FIXTURES = ['next-14-webpack', 'next-15-webpack', 'next-15-turbopack', 'next-16-webpack', 'next-16-turbopack']

const REMOTE_URL = 'https://picsum.photos/seed/alias-test/200/300.jpg'

const filter = process.env.FIXTURE
const targets = filter ? FIXTURES.filter((f) => f === filter) : FIXTURES

if (targets.length === 0) {
  throw new Error(`No fixtures matched FIXTURE=${filter}. Available: ${FIXTURES.join(', ')}`)
}

type Manifest = Array<{ output: string; src: string; width: number; extension: string; externalUrl?: string }>

const fixtureDir = (fixture: string) => path.resolve(__dirname, 'fixtures', fixture)

const readManifest = (fixture: string): Manifest => {
  const p = path.join(fixtureDir(fixture), '.next/next-export-optimize-images-list.nd.json')
  if (!fs.existsSync(p)) {
    throw new Error(`Manifest not found for ${fixture} at ${p}. Did the fixture build run? (npm run pretest:alias-e2e)`)
  }
  return fs
    .readFileSync(p, 'utf8')
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line))
}

// Each Next major has slightly different defaults for imageSizes (Next 16 dropped the 16 entry).
// Read the fixture's own copy of Next so the expected width count tracks whichever version ran.
const expectedWidths = (fixture: string): Set<number> => {
  const cfgPath = path.join(fixtureDir(fixture), 'node_modules/next/dist/shared/lib/image-config')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { imageConfigDefault } = require(cfgPath) as {
    imageConfigDefault: { imageSizes: number[]; deviceSizes: number[] }
  }
  const overriddenDeviceSizes = [320, 480, 768, 1024, 1440, 1920]
  return new Set<number>([...imageConfigDefault.imageSizes, ...overriddenDeviceSizes])
}

describe.each(targets)('unstable_nextImageAlias rewrites next/image for %s', (fixture) => {
  let manifest: Manifest

  beforeAll(() => {
    manifest = readManifest(fixture)
  })

  test('remote URL is registered in the manifest', () => {
    const remoteEntries = manifest.filter((e) => e.externalUrl === REMOTE_URL)
    expect(remoteEntries.length).toBeGreaterThan(0)
  })

  test('remote URL is registered for every configured size', () => {
    const remoteEntries = manifest.filter((e) => e.externalUrl === REMOTE_URL)
    const widths = new Set(remoteEntries.map((e) => e.width))
    expect(widths).toEqual(expectedWidths(fixture))
  })

  test('static import is not treated as remote', () => {
    const nonRemote = manifest.filter(
      (e) => typeof e.externalUrl === 'string' && !/^(https?:)?\/\//i.test(e.externalUrl)
    )
    expect(nonRemote).toEqual([])
  })

  test('public-path image is not treated as remote', () => {
    const publicEntries = manifest.filter((e) => e.externalUrl === '/public.jpg')
    expect(publicEntries).toEqual([])
  })
})

// Cheap cross-version smoke check for the package's other entry points. We don't
// render them — just verify each resolves against the fixture's installed Next
// and that the module loads top-to-bottom without throwing. Catches `tsup` entry
// drift, Turbopack-target deep-path regressions, and React 18 ↔ 19 forwardRef
// API breakage in our wrappers.
const PACKAGE_ENTRIES = [
  'next-export-optimize-images/image',
  'next-export-optimize-images/picture',
  'next-export-optimize-images/remote-image',
  'next-export-optimize-images/remote-picture',
  'next-export-optimize-images/legacy/image',
]

describe.each(targets)('package entries resolve and load in %s', (fixture) => {
  // Rooting `createRequire` at the fixture's package.json makes `next/image`,
  // `react`, etc. resolve from THAT fixture's node_modules instead of the
  // workspace's. Without this we'd be loading the same workspace Next 16 every
  // iteration, which defeats the cross-version point.
  const fixtureRequire = createRequire(path.join(fixtureDir(fixture), 'package.json'))

  test.each(PACKAGE_ENTRIES)('%s loads without error', (entry) => {
    expect(() => fixtureRequire(entry)).not.toThrow()
  })

  test.each(PACKAGE_ENTRIES)('%s exports a forwardRef-style default', (entry) => {
    const mod = fixtureRequire(entry) as { default?: unknown }
    expect(mod.default).toBeDefined()
    // forwardRef components are objects (`{ $$typeof, render }`); function
    // components are functions. Either is a valid React component shape.
    expect(['function', 'object']).toContain(typeof mod.default)
  })
})

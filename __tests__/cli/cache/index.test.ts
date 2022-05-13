import fs from 'fs'
import path from 'path'

import { CacheImages, createCacheDir, readCacheManifest, writeCacheManifest } from '../../../src/cli/utils/cache'

const cacheDir = path.resolve(__dirname, '.cache')

beforeAll(() => {
  createCacheDir(cacheDir)
})

describe('Cache', () => {
  test('Create a cache directory', () => {
    expect(fs.existsSync(cacheDir)).toBeTruthy()
  })

  test('Create and load a cache manifest', () => {
    const filePath = path.resolve(__dirname, '.cache/cached-images.json')
    const cacheImages: CacheImages = [{ output: '/_next/static/chunks/images/default.png', hash: '01234' }]

    writeCacheManifest(filePath, cacheImages)

    expect(readCacheManifest(filePath)).not.toBeNull()
  })
})

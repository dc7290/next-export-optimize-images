import path from 'path'

import fs from 'fs-extra'

import { getOptimizeResult } from '../../../src/cli'
import type { CacheImages } from '../../../src/cli/utils/cache'

const cacheDir = path.resolve(__dirname, '.cache')

jest.setTimeout(60 * 3 * 1000)

beforeAll(
  async () => {
    const resultsDir = path.resolve(__dirname, 'results')

    await Promise.all([fs.remove(resultsDir), fs.remove(cacheDir)])
    await fs.mkdirp(path.join(resultsDir, '_next/static/chunks/images'))
  },
  60 * 3 * 1000
)

describe('Cache', () => {
  test('Cache is created and optimization is skipped', async () => {
    const manifest = [
      {
        output: '/_next/static/chunks/images/default_1920_75.png',
        src: '/default.png',
        width: 1920,
        quality: 75,
        extension: 'png',
      },
      {
        output: '/_next/static/chunks/images/default_3840_75.png',
        src: '/default.png',
        width: 3840,
        quality: 75,
        extension: 'png',
      },
    ]

    let measuredCache = 0
    let measuredNonCache = 0
    let measuredError = 0

    const destDir = path.resolve(__dirname, 'results')
    const cacheMeasurement = () => (measuredCache += 1)
    const nonCacheMeasurement = () => (measuredNonCache += 1)
    const errorMeasurement = () => (measuredError += 1)
    const cliProgressBarIncrement = () => undefined
    const srcDir = path.resolve(__dirname, 'fixtures')

    const cacheImages: CacheImages = []

    await Promise.all(
      manifest.map(async (item) => {
        const imageBuffer = await fs.readFile(path.join(srcDir, item.src))

        return getOptimizeResult({
          imageBuffer,
          destDir,
          noCache: false,
          cacheImages,
          cacheDir,
          cacheMeasurement,
          nonCacheMeasurement,
          errorMeasurement,
          pushInvalidFormatAssets: () => undefined,
          cliProgressBarIncrement,
          originalFilePath: path.join(srcDir, item.src),
          ...item,
        })
      })
    )

    await Promise.all(
      manifest.map(async (item) => {
        const imageBuffer = await fs.readFile(path.join(srcDir, item.src))

        return getOptimizeResult({
          imageBuffer,
          destDir,
          noCache: false,
          cacheImages,
          cacheDir,
          cacheMeasurement,
          nonCacheMeasurement,
          errorMeasurement,
          pushInvalidFormatAssets: () => undefined,
          cliProgressBarIncrement,
          originalFilePath: path.join(srcDir, item.src),
          ...item,
        })
      })
    )

    expect(measuredCache).toBe(2)
    expect(measuredNonCache).toBe(2)
    expect(measuredError).toBe(0)
  })
})

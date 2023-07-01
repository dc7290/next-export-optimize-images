import path from 'path'

import fs from 'fs-extra'
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'

import { optimizeImages } from '../../../src/cli'

const fixturesDir = path.resolve(__dirname, 'fixtures')

beforeAll(async () => {
  await fs.remove(fixturesDir)
  await optimizeImages({
    manifestJsonPath: path.resolve(__dirname, 'manifest.json'),
    noCache: true,
    terse: true,
    config: {
      outDir: '__tests__/cli/external-images/fixtures',
    },
    nextImageConfig: imageConfigDefault,
  })
}, 60 * 3 * 1000)

const exist = (filename: string) => fs.existsSync(path.join(fixturesDir, '_next/static/media', filename))

describe('External Image Optimization.', () => {
  test('Downloadable', () => {
    expect(exist('og.png')).toBeTruthy()
  })
})

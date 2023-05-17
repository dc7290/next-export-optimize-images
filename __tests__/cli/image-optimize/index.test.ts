import path from 'path'

import fs from 'fs-extra'
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'

import { optimizeImages } from '../../../src/cli'

beforeAll(async () => {
  await optimizeImages({
    manifestJsonPath: path.resolve(__dirname, 'manifest.json'),
    noCache: true,
    terse: true,
    config: {
      outDir: '__tests__/cli/image-optimize/fixtures',
    },
    nextImageConfig: imageConfigDefault,
  })
}, 60 * 3 * 1000)

const exist = (filename: string) => fs.existsSync(path.resolve(__dirname, 'fixtures/results/images', filename))

describe('Image optimization.', () => {
  test('png images optimized', () => {
    expect(exist('default_10_75.png')).toBeTruthy()
    expect(exist('default_1920_75.png')).toBeTruthy()
    expect(exist('default_3840_75.png')).toBeTruthy()
  })

  test('jpeg images optimized', () => {
    expect(exist('default_10_75.jpeg')).toBeTruthy()
    expect(exist('default_1920_75.jpeg')).toBeTruthy()
    expect(exist('default_3840_75.jpeg')).toBeTruthy()
  })

  test('jpg images optimized', () => {
    expect(exist('default_10_75.jpg')).toBeTruthy()
    expect(exist('default_1920_75.jpg')).toBeTruthy()
    expect(exist('default_3840_75.jpg')).toBeTruthy()
  })

  test('webp images optimized', () => {
    expect(exist('default_10_75.webp')).toBeTruthy()
    expect(exist('default_1920_75.webp')).toBeTruthy()
    expect(exist('default_3840_75.webp')).toBeTruthy()
  })

  test('avif images optimized', () => {
    expect(exist('default_10_75.avif')).toBeTruthy()
    expect(exist('default_1920_75.avif')).toBeTruthy()
    expect(exist('default_3840_75.avif')).toBeTruthy()
  })

  test('svg images copied', () => {
    expect(exist('default_10_75.svg')).toBeTruthy()
    expect(exist('default_1920_75.svg')).toBeTruthy()
    expect(exist('default_3840_75.svg')).toBeTruthy()
  })
})

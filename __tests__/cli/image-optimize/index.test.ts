import fs from 'fs'
import path from 'path'

import { optimizeImages } from '../../../src/cli'

beforeAll(async () => {
  const resultsDir = path.resolve(__dirname, 'results')

  fs.rmSync(resultsDir, { recursive: true, force: true })
  fs.mkdirSync(path.join(resultsDir, '_next/static/chunks/images'), { recursive: true })

  await optimizeImages({
    srcDir: path.resolve(__dirname, 'fixtures'),
    manifestJsonPath: path.resolve(__dirname, 'manifest.json'),
    outputDir: path.resolve(__dirname, 'results'),
    noCache: true,
  })
}, 60 * 3 * 1000)

const exist = (filename: string) =>
  fs.existsSync(path.resolve(__dirname, 'results/_next/static/chunks/images', filename))

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
})

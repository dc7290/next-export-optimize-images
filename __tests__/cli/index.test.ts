import fs from 'fs'
import path from 'path'

import { optimizeImages } from '../../src/cli'

beforeEach(async () => {
  const resultsDir = path.resolve(__dirname, 'results')

  fs.rmSync(resultsDir, { recursive: true, force: true })
  fs.mkdirSync(resultsDir)

  await optimizeImages({
    srcDir: path.resolve(__dirname),
    manifestJsonPath: path.resolve(__dirname, 'manifest.json'),
    outputDir: path.resolve(__dirname, 'results'),
  })
}, 60 * 3 * 1000)

const exist = (filename: string) => fs.existsSync(path.resolve(__dirname, 'results', filename))

describe("It's a cli test.", () => {
  test('no props', () => {
    expect(exist('default-1920.png')).toBeTruthy()
    expect(exist('default-3840.png')).toBeTruthy()
  })
})

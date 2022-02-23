import fs from 'fs'
import path from 'path'

import { optimizeImages } from '../../src/cli'

// const exist = (path: string) => {
//   fs.readFileSync(path)
// }

beforeEach(async () => {
  const resultsDir = path.resolve(__dirname, '../results')

  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir)
  }

  await optimizeImages({
    srcDir: path.resolve(__dirname, '../'),
    manifestJsonPath: path.resolve(__dirname, 'manifest.json'),
    outputDir: path.resolve(__dirname, '../results'),
  })
}, 60 * 3 * 1000)

describe("It's a cli test.", () => {
  test('no props', () => {
    // exist('')
  })
})

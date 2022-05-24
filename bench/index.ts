import path from 'path'

import Benchmark from 'benchmark'
import sharp from 'sharp'

import { optimizeImages } from '../src/cli'

sharp.cache(false)

const suite = new Benchmark.Suite()

suite
  .add('current', async () => {
    await optimizeImages({
      manifestJsonPath: path.resolve(__dirname, 'manifest.json'),
      noCache: true,
      config: {
        outDir: 'bench/fixtures',
      },
      terse: true,
    })
  })
  .add('new', async () => {
    // await newOptimizeImages({
    //   manifestJsonPath: path.resolve(__dirname, 'manifest.json'),
    //   noCache: true,
    //   config: {
    //     outDir: 'bench/fixtures',
    //   },
    //   terse: true,
    // })
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .on('cycle', (event: any) => {
    // eslint-disable-next-line no-console
    console.log(String(event.target))
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .on('complete', function (this: any) {
    // eslint-disable-next-line no-console
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run({ async: true })

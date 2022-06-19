#!usr/bin/env zx

import { $ } from 'zx'

await $`rimraf {__tests__/e2e/.next,__tests__/e2e/out}`

await $`swc src -d dist`

await $`cross-env TEST_JSON_PATH=__tests__/e2e/.next/custom-optimized-images.nd.json next build __tests__/e2e`

await $`next export __tests__/e2e`

require('../../dist/cli').run({
  customManifestJsonPath: '__tests__/e2e/.next/custom-optimized-images.nd.json',
  noCache: true,
})

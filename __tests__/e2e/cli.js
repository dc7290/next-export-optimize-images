#!/usr/bin/env node
require('../../dist/cli').run({
  customManifestJsonPath: '__tests__/e2e/.next/custom-optimized-images.nd.json',
  noCache: true,
})

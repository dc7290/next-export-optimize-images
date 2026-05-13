#!/usr/bin/env node
const { FIXTURES, buildFixture } = require('./lib')

const requested = process.env.FIXTURE
const targets = requested ? FIXTURES.filter((f) => f.name === requested) : FIXTURES

if (targets.length === 0) {
  console.error(`No fixtures matched FIXTURE=${requested}. Available: ${FIXTURES.map((f) => f.name).join(', ')}`)
  process.exit(1)
}

for (const fixture of targets) {
  buildFixture(fixture)
}

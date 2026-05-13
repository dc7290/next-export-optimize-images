#!/usr/bin/env node
const { FIXTURES, buildFixture } = require('./lib')

const name = process.argv[2]
if (!name) {
  console.error(`Usage: build-one.js <fixture-name>\nAvailable: ${FIXTURES.map((f) => f.name).join(', ')}`)
  process.exit(1)
}

const target = FIXTURES.find((f) => f.name === name)
if (!target) {
  console.error(`Unknown fixture: ${name}\nAvailable: ${FIXTURES.map((f) => f.name).join(', ')}`)
  process.exit(1)
}

buildFixture(target)

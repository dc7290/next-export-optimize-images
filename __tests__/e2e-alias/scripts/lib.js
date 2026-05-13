const path = require('node:path')
const fs = require('node:fs')
const { execSync } = require('node:child_process')

const aliasRoot = path.resolve(__dirname, '..')
const sharedDir = path.join(aliasRoot, 'shared')
const fixturesDir = path.join(aliasRoot, 'fixtures')

const FIXTURES = [
  { name: 'next-14-webpack', buildArgs: [] },
  { name: 'next-15-webpack', buildArgs: [] },
  { name: 'next-15-turbopack', buildArgs: ['--turbopack'] },
  { name: 'next-16-webpack', buildArgs: ['--webpack'] },
  { name: 'next-16-turbopack', buildArgs: [] },
]

const log = (msg) => console.log(`[alias-e2e] ${msg}`)

const syncSharedFiles = (dir) => {
  for (const target of ['app', 'public', 'static.jpg', 'next.config.js']) {
    fs.rmSync(path.join(dir, target), { recursive: true, force: true })
  }
  fs.cpSync(path.join(sharedDir, 'app'), path.join(dir, 'app'), { recursive: true })
  fs.cpSync(path.join(sharedDir, 'public'), path.join(dir, 'public'), { recursive: true })
  fs.copyFileSync(path.join(sharedDir, 'static.jpg'), path.join(dir, 'static.jpg'))
  fs.copyFileSync(path.join(sharedDir, 'next.config.js'), path.join(dir, 'next.config.js'))
}

const cleanBuildArtifacts = (dir) => {
  for (const target of ['.next', 'out']) {
    fs.rmSync(path.join(dir, target), { recursive: true, force: true })
  }
}

const installFixture = (dir) => {
  // npm caches the packed file: dep by integrity hash, which means dist updates
  // can silently get ignored across runs. Remove the installed copy so npm
  // re-packs the current dist/. Next + React stay cached.
  fs.rmSync(path.join(dir, 'node_modules', 'next-export-optimize-images'), { recursive: true, force: true })
  execSync('npm install --install-links --no-audit --no-fund --no-progress', {
    cwd: dir,
    stdio: 'inherit',
  })
}

const buildFixture = ({ name, buildArgs }) => {
  const dir = path.join(fixturesDir, name)
  if (!fs.existsSync(dir)) throw new Error(`Fixture ${name} not found at ${dir}`)

  log(`syncing shared files into ${name}`)
  syncSharedFiles(dir)

  log(`installing ${name}`)
  installFixture(dir)

  log(`cleaning build artifacts for ${name}`)
  cleanBuildArtifacts(dir)

  log(`building ${name} (next build ${buildArgs.join(' ')})`)
  execSync(`npx next build ${buildArgs.join(' ')}`.trim(), { cwd: dir, stdio: 'inherit' })

  log(`done ${name}`)
}

module.exports = { FIXTURES, buildFixture, fixturesDir }

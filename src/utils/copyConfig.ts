import path from 'path'

import fs from 'fs-extra'

const defaultConfigFile = `module.exports = {}`

const copyConfig = (filePath: string) => {
  const libDir = path.resolve(process.cwd(), 'node_modules/next-export-optimize-images')

  fs.mkdirpSync(libDir)

  if (fs.existsSync(filePath)) {
    fs.copyFileSync(filePath, `${libDir}/export-images.config.js`)
  } else {
    fs.writeFileSync(`${libDir}/export-images.config.js`, defaultConfigFile, 'utf-8')
  }
}

export default copyConfig

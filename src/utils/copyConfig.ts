import fs from 'fs'
import path from 'path'

const defaultConfigFile = `module.exports = {}`

const copyConfig = (filePath: string) => {
  const libDir = path.resolve(process.cwd(), 'node_modules/next-export-optimize-images')

  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true })
  }

  if (fs.existsSync(filePath)) {
    fs.copyFileSync(filePath, `${libDir}/export-images.config.js`)
  } else {
    fs.writeFileSync(`${libDir}/export-images.config.js`, defaultConfigFile, 'utf-8')
  }
}

export default copyConfig

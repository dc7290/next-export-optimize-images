import fs from 'fs'
import path from 'path'

const copyConfig = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    const destDir = path.resolve(process.cwd(), 'node_modules/next-export-optimize-images')
    fs.copyFileSync(filePath, `${destDir}/export-images.config.js`)
  }
}

export default copyConfig

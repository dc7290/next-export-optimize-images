import type { AvifOptions, JpegOptions, PngOptions, WebpOptions } from 'sharp'

export type Config = {
  outDir?: string
  imageDir?: string
  basePath?: string
  filenameGenerator?: (generatorProps: {
    path: string
    name: string
    width: number
    quality: number
    extension: string
  }) => string
  sharpOptions?: {
    png?: PngOptions
    jpg?: JpegOptions
    webp?: WebpOptions
    avif?: AvifOptions
  }
}

const getConfig = (): Config => {
  try {
    return require('next-export-optimize-images/export-images.config.js')
  } catch (_) {
    return {}
  }
}

export const copyConfig = (filePath: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fs = require('fs')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const path = require('path')

  if (fs.existsSync(filePath)) {
    const destDir = path.resolve(process.cwd(), 'node_modules/next-export-optimize-images')
    fs.copyFileSync(filePath, `${destDir}/export-images.config.js`)
  }
}

export default getConfig

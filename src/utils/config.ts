import type { AvifOptions, JpegOptions, PngOptions, WebpOptions } from 'sharp'

export type Config = {
  outDir?: string
  imageDir?: string
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
  if (fs.existsSync(filePath)) {
    fs.copyFileSync(filePath, `${require.resolve('next-export-optimize-images')}/export-images.config.js`)
  }
}

export default getConfig

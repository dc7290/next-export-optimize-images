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
    if (process.env.NODE_ENV === 'test') {
      return require(`../../${process.env['TEST_CONFIG_PATH']}`)
    }

    return require('next-export-optimize-images/export-images.config.js')
  } catch (_) {
    return {}
  }
}

export default getConfig

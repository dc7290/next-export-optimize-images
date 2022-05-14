import path from 'path'

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

export const getConfig = (): Config => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const config = require(path.resolve(process.cwd(), process.env['TEST_CONFIG_PATH'] ?? 'export-images.config.js'))
    return config
  } catch (error) {
    return {}
  }
}

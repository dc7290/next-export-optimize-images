import type { AvifOptions, JpegOptions, PngOptions, WebpOptions } from 'sharp'

import type { AllowedFormat } from '../cli/utils/formatValidate'

export type Config = {
  /**
   * Specify if you are customizing the default output directory, such as next export -o outDir.
   *
   * @type {string}
   */
  outDir?: string
  /**
   * You can customize the directory to output optimized images.
   * The default is '_next/static/chunks/images'.
   *
   * @type {string}
   */
  imageDir?: string
  /**
   * Required if you have set basePath in next.config.js.
   * Please set the same value.
   *
   * @type {string}
   */
  externalImageDir?: string
  /**
   * You can customize the directory to output downloaded external images.
   * The default is '_next/static/media'
   *
   * @type {string}
   */
  basePath?: string
  /**
   * You can customize the generation of file names.
   *
   * ❗️Attention
   * When making this setting, make sure that the file names (including the path part) of different images do not cover each other.
   * Specifically, include the name, width, quality, and extension in the return value. If path is not included, all src's should be specified with import or require so that they can be distinguished by their hash value even if they have the same filename.
   *
   * @type {({ path: string, name: string, width: number, quality: number, extension: string }) => string}
   */
  filenameGenerator?: (generatorProps: {
    path: string
    name: string
    width: number
    quality: number
    extension: string
  }) => string
  /**
   * You can set optimization options for each extension.
   * Please refer to the official sharp documentation for more information.
   *
   * @type {{ png?: PngOptions, jpg?: JpegOptions, webp?: WebpOptions, avif?: AvifOptions } }}
   */
  sharpOptions?: {
    png?: PngOptions
    jpg?: JpegOptions
    webp?: WebpOptions
    avif?: AvifOptions
  }
  /**
   * It allows you to convert images from any extension to another extension.
   *
   * @type {[beforeConvert: AllowedFormat, afterConvert: AllowedFormat][]}
   */
  convertFormat?: [beforeConvert: AllowedFormat, afterConvert: AllowedFormat][]
}

const getConfig = (): Config => {
  try {
    if (process.env['NODE_ENV'] === 'test') {
      return require(`../../${process.env['TEST_CONFIG_PATH']}`)
    }

    return require('next-export-optimize-images/export-images.config.js')
  } catch (_) {
    return {}
  }
}

export default getConfig

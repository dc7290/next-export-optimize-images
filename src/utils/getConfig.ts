import type { AvifOptions, JpegOptions, PngOptions, WebpOptions } from 'sharp'

import type { AllowedFormat } from './formatValidate'

type ParsedImageInfo = {
  pathWithoutName: string
  name: string
  extension: string
}
export type DefaultImageParser = (src: string) => ParsedImageInfo
type SourceImageParser = (determinerProps: { src: string; defaultParser: DefaultImageParser }) => ParsedImageInfo

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
  basePath?: string
  /**
   * You can customize the directory to output downloaded external images.
   * The default is '_next/static/media'
   *
   * @type {string}
   */
  externalImageDir?: string
  /**
   * You can customize the quality of the optimized image.
   * The default is 75.
   */
  quality?: number
  /**
   * You can customize the generation of file names.
   *
   * ❗️Attention
   * When making this setting, make sure that the file names (including the path part) of different images do not cover each other.
   * Specifically, include the name, width, and extension in the return value. If path is not included, all src's should be specified with import or require so that they can be distinguished by their hash value even if they have the same filename.
   *
   * @type {({ path: string, name: string, width: number, extension: string }) => string}
   */
  filenameGenerator?: (generatorProps: { path: string; name: string; width: number; extension: string }) => string
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

  /**
   * You can generate extra images in extensions specified.
   *
   * @type {AllowedFormat[]}
   */
  generateFormats?: AllowedFormat[]

  /**
   * Allows you to optionally override the parsed image information before optimized images.
   *
   * @type {SourceImageParser}
   */
  sourceImageParser?: SourceImageParser

  /**
   * You can directly specify the URL of an external image.
   * This is useful in cases where it is not known what images will be used for the build using variables, for example.
   *
   * @type {string[] | (() => string[] | Promise<string[]>)}
   */
  remoteImages?: string[] | (() => string[] | Promise<string[]>)
}

const getConfig = (): Config => {
  return require('next-export-optimize-images/export-images.config.js')
}

export default getConfig

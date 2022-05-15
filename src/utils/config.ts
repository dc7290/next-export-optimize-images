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

let runtimeConfig: Config

const getConfig = (): Config => {
  return runtimeConfig
  // try {
  //   return require(`${appRoot}/export-images.config.js`)
  // } catch (error) {
  //   return {}
  // }
}

export const setConfig = (configValue: Config) => {
  runtimeConfig = configValue
}

export default getConfig

import formatValidate from './formatValidate'
import { Config, DefaultImageParser } from './getConfig'

const defaultImageParser: DefaultImageParser = (src: string) => {
  const path = src.split(/\.([^.]*$)/)[0]
  const extension = (src.split(/\.([^.]*$)/)[1] || '').split('?')[0]

  if (!path || !extension) {
    throw new Error(`Invalid path or no file extension: ${src}`)
  }

  let pathWithoutName = path.split('/').slice(0, -1).join('/')
  const name = path.split('/').slice(-1).toString()

  if (src.startsWith('http')) {
    pathWithoutName = pathWithoutName
      .replace(/^https?:\/\//, '')
      .split('/')
      .slice(1)
      .join('/')
  }

  return {
    pathWithoutName,
    name,
    extension,
  }
}

type BuildOutputInfoArgs = {
  src: string
  width: number
  config: Config
}

const buildOutputInfo = ({ src: _src, width, config }: BuildOutputInfoArgs) => {
  let src = _src

  if (config.basePath !== undefined) {
    src = _src.replace(config.basePath, '')
  }

  const parsedImageInformation = config.sourceImageParser
    ? config.sourceImageParser({ src, defaultParser: defaultImageParser })
    : defaultImageParser(src)

  let { extension } = parsedImageInformation
  const { pathWithoutName, name, extension: originalExtension } = parsedImageInformation

  if (config.convertFormat !== undefined) {
    const convertArray = config.convertFormat.find(([beforeConvert]) => beforeConvert === extension)
    if (convertArray !== undefined) {
      if (!formatValidate(convertArray[0]))
        throw Error(`Unauthorized format specified in \`configFormat\`. beforeConvert: ${convertArray[0]}`)
      if (!formatValidate(convertArray[1]))
        throw Error(`Unauthorized format specified in \`configFormat\`. afterConvert: ${convertArray[1]}`)

      extension = convertArray[1]
    }
  }

  const outputDir = `/${
    config.imageDir ? config.imageDir.replace(/^\//, '').replace(/\/$/, '') : '_next/static/chunks/images'
  }`
  const externalOutputDir = `${
    config.externalImageDir ? config.externalImageDir.replace(/^\//, '').replace(/\/$/, '') : '_next/static/media'
  }`

  const extensions = config.generateFormats ? [...new Set([extension, ...config.generateFormats])] : [extension]
  return extensions.map((extension, index) => {
    if (index > 0 && !formatValidate(extension))
      throw Error(`Unauthorized extension specified in \`generateFormats\`: ${extension}`)

    const filename =
      config.filenameGenerator !== undefined
        ? config.filenameGenerator({ path: pathWithoutName, name, width, extension })
        : `${pathWithoutName}/${name}_${width}.${extension}`
    const output = `${outputDir}/${filename.replace(/^\//, '')}`

    return { output, src, extension, originalExtension, externalOutputDir }
  })
}

export default buildOutputInfo

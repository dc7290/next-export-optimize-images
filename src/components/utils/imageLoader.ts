import type { ImageLoaderProps } from 'next/dist/shared/lib/image-external'

import buildOutputInfo from '../../utils/buildOutputInfo'
import getConfig from '../../utils/getConfig'

const config = getConfig()

const imageLoader =
  (getNumber?: number) =>
  ({ src, width }: ImageLoaderProps) => {
    if (process.env['NODE_ENV'] === 'development') {
      // This doesn't bother optimizing in the dev environment. Next complains if the
      // returned URL doesn't have a width in it, so adding it as a throwaway
      return `${src}?width=${width}`
    }

    const outputInfo = buildOutputInfo({ src, width, config }).at(getNumber ?? -1)

    if (outputInfo === undefined) {
      throw new Error(`No output info found for ${src}`)
    }

    return `${config.basePath ?? ''}${outputInfo.output}`
  }

export default imageLoader

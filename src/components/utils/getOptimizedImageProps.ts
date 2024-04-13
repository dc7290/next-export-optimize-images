import { getImageProps, ImageProps } from 'next/image'

import getStringSrc from './getStringSrc'
import imageLoader from './imageLoader'

export type ImgProps = ReturnType<typeof getImageProps>

const getOptimizedImageProps = (props: ImageProps): ImgProps => {
  const srcStr = getStringSrc(props.src)

  return getImageProps({
    ...props,
    loader: props.loader || imageLoader(),
    ...(props.blurDataURL
      ? { blurDataURL: props.blurDataURL }
      : typeof props.src === 'string' && props.placeholder === 'blur' && props.loader === undefined
        ? { blurDataURL: imageLoader()({ src: props.src, width: 8, quality: 10 }) }
        : {}),
    unoptimized: props.unoptimized !== undefined ? props.unoptimized : srcStr.endsWith('.svg'),
  })
}

export default getOptimizedImageProps

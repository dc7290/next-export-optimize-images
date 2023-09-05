import type { ImageProps, StaticImageData } from 'next/dist/shared/lib/image-external'

import type { StaticRequire } from '../image'

const getStringSrc = (imgSrc: ImageProps['src']) => {
  return typeof imgSrc === 'string'
    ? imgSrc
    : (imgSrc as StaticRequire).default !== undefined
    ? (imgSrc as StaticRequire).default.src
    : (imgSrc as StaticImageData).src
}

export default getStringSrc

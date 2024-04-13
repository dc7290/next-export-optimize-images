import Image from '../../../image'
import React from 'react'

import imgSrc from '../images/img.png'

export default function IndexPage() {
  return (
    <div>
      {/* Imported image */}
      <Image src={imgSrc} alt="" />

      {/* Static image */}
      <Image src="/images/img.png" width={1920} height={1280} sizes="(min-width: 768px) 720px, 85vw" alt="" />
    </div>
  )
}

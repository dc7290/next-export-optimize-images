import React, { useEffect, useState } from 'react'

import Image from '../../../dist/image'
import LegacyImage from '../../../dist/legacy-image'
import clientOnlySrc from '../images/client-only.png'
import imgSrc from '../images/img.png'
import legacyImgSrc from '../images/legacy-img.png'

const IndexPage = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {/* next/image */}
      <div>
        {/* Imported image */}
        <Image src={imgSrc} alt="" />

        {/* Static image */}
        <Image src="/images/img.png" width={1920} height={1280} sizes="(min-width: 768px) 720px, 85vw" alt="" />

        {/* Invalid format image */}
        <Image src="/images/img.svg" width={1920} height={1280} alt="" />

        {/* External image */}
        <Image src="https://next-export-optimize-images.vercel.app/og.png" width={1920} height={1280} alt="" />

        {isClient && <Image src={clientOnlySrc} alt="" />}
      </div>
      {/* next/legacy/image */}
      <div>
        {/* Imported image */}
        <LegacyImage src={legacyImgSrc} alt="" />

        {/* Static image */}
        <LegacyImage
          src="/images/legacy-img.png"
          width={1920}
          height={1280}
          sizes="(min-width: 768px) 720px, 85vw"
          alt=""
        />
      </div>
    </>
  )
}

export default IndexPage

import React, { useEffect, useState } from 'react'

import FutureImage from '../../../dist/future-image'
import Image from '../../../dist/image'
import clientOnlySrc from '../images/client-only.png'
import futureImgSrc from '../images/future-img.png'
import imgSrc from '../images/img.png'

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
        <Image src={imgSrc} />

        {/* Static image */}
        <Image src="/images/img.png" width={1920} height={1280} sizes="(min-width: 768px) 720px, 85vw" />

        {/* Invalid format image */}
        <Image src="/images/img.svg" width={1920} height={1280} />

        {/* External image */}
        <Image src="https://next-export-optimize-images.vercel.app/og.png" width={1920} height={1280} />

        {isClient && <Image src={clientOnlySrc} />}
      </div>
      {/* next/future/image */}
      <div>
        {/* Imported image */}
        <FutureImage src={futureImgSrc} />

        {/* Static image */}
        <FutureImage src="/images/future-img.png" width={1920} height={1280} sizes="(min-width: 768px) 720px, 85vw" />
      </div>
    </>
  )
}

export default IndexPage

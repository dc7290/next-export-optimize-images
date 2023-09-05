import Image from 'next/image'
import LegacyImage from 'next/legacy/image'
import React from 'react'

import Picture from '../../../dist/components/picture'
import ClientComponent from '../components/ClientComponent'

import imgSrc from '../images/img.png'
import legacyImgSrc from '../images/legacy-img.png'

export default function IndexPage() {
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

        {/* Animated image */}
        <Image src="/images/animated.webp" width={400} height={400} alt="" />

        <ClientComponent />
      </div>
      {/* picture */}
      <div>
        {/* Imported image */}
        <Picture src={imgSrc} alt="" />

        {/* Static image */}
        <Picture src="/images/img.png" width={1920} height={1280} sizes="(min-width: 768px) 720px, 85vw" alt="" />
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

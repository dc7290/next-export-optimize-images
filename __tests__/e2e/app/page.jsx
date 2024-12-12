import React from 'react'

import Image from '../../../image'
import LegacyImage from '../../../legacy/image'
import Picture from '../../../picture'
import RemoteImage from '../../../remote-image'
import RemotePicture from '../../../remote-picture'
import ClientComponent from '../components/ClientComponent'
import WithPropsComponent from '../components/WithPropsComponent'
import imgSrc from '../images/img.png'
import legacyImgSrc from '../images/legacy-img.png'

const id = 400

export default function IndexPage() {
  return (
    <>
      {/* next/image */}
      <div>
        {/* Imported image */}
        <Image src={imgSrc} alt="" />

        {/* Static image */}
        <Image src="/images/img.png" width={1920} height={1280} sizes="(min-width: 768px) 720px, 85vw" alt="" />

        {/* Image with props */}
        <WithPropsComponent />

        {/* Invalid format image */}
        <Image src="/images/img.svg" width={1920} height={1280} alt="" />

        {/* External Image with RemoteImage */}
        <RemoteImage src="https://picsum.photos/id/300/200/400.jpg" />

        {/* External Image with RemoteImage dynamic src */}
        <RemoteImage src={`https://picsum.photos/id/${id}/200/400.jpg`} />

        {/* External Image with RemotePicture */}
        <RemotePicture src="https://picsum.photos/id/500/200/400.jpg" />

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

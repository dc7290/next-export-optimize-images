import Image from '../../../dist/image'

import imgSrc from '../images/img.png'
import clientOnlySrc from '../images/client-only.png'
import { useEffect, useState } from 'react'

const IndexPage = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div>
      {/* Imported image */}
      <Image src={imgSrc} />

      {/* Static image */}
      <Image src="/images/img.png" width={1920} height={1280} sizes="(min-width: 768px) 720px, 85vw" />

      {/* External image */}
      <Image src="https://next-export-optimize-images.vercel.app/og.png" width={1920} height={1280} />

      {isClient && <Image src={clientOnlySrc} />}
    </div>
  )
}

export default IndexPage

import Image from 'next/image'

import imgSrc from '../images/img.png'

const IndexPage = () => {
  return (
    <div style={{ width: '85vw', maxWidth: '960px', margin: '0 auto' }}>
      <Image src={imgSrc} sizes="(min-width: 768px) 720px, 85vw" priority />

      {/* <Image
        src="/img.png"
        width={1920}
        height={1281}
        sizes="(min-width: 768px) 720px, 85vw"
        priority
      /> */}
    </div>
  )
}

export default IndexPage

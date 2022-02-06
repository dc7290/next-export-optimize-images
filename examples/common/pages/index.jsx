import Image from 'next/image'

const IndexPage = () => {
  return (
    <div style={{ width: '85vw', maxWidth: '960px', margin: '0 auto' }}>
      <Image
        loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality ?? 75}`}
        src={require('~/src/images/img.png')}
        sizes="(min-width: 768px) 720px, 85vw"
        priority
      />
      {/* <Image
        loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality ?? 75}`}
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

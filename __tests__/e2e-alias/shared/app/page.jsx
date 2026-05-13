import Image from 'next/image'
import React from 'react'
import staticImg from '../static.jpg'

export const dynamic = 'force-static'

export default function IndexPage() {
  return (
    <main>
      <Image src="https://picsum.photos/seed/alias-test/200/300.jpg" width={200} height={300} alt="remote" />
      <Image src={staticImg} alt="static" />
      <Image src="/public.jpg" width={100} height={100} alt="public" />
    </main>
  )
}

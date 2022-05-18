import React from 'react'

import Text from '../components/Text'

const Hero = () => {
  return (
    <div className="container mx-auto py-40 sm:py-64 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-[50rem] max-w-full">
        <Text aria-hidden="true" />
        <p className="sr-only">Next Export Optimize Images</p>
      </div>
      <p className="mt-8 text-center text-xl">Optimize images at build time with Next.js.</p>
    </div>
  )
}

export default Hero

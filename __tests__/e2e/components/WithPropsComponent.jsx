'use client'

import React from 'react'
import { getOptimizedImageProps } from '../../../image'

import getPropsSrc from '../images/get-props.png'
import getPropsMobileSrc from '../images/get-props-mobile.png'

const WithPropsComponent = () => {
  const props = getOptimizedImageProps({ src: getPropsSrc, alt: '' }).props
  const mobileProps = getOptimizedImageProps({ src: getPropsMobileSrc, alt: '' }).props

  return (
    <div>
      <img {...props} />
      <div
        style={{
          backgroundImage: `url(${props.src})`,
          width: props.width,
          height: props.height,
        }}
      ></div>
      <picture>
        <source
          srcSet={mobileProps.srcSet}
          width={mobileProps.width}
          height={mobileProps.height}
          media="(max-width: 768px)"
        />
        <img {...props} />
      </picture>
    </div>
  )
}

export default WithPropsComponent

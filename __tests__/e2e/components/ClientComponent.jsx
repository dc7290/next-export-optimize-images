'use client'

import React, { useState, useEffect } from 'react'
import Image from '../../../image'

import clientOnlySrc from '../images/client-only.png'

const ClientComponent = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? <Image src={clientOnlySrc} alt="" /> : null
}

export default ClientComponent

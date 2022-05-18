import Layout from '@theme/Layout'
import React from 'react'

import Hero from '../components/Hero'
import GettingStarted from '../components/GettingStarted'
import Features from '../components/Features'

const Home = () => {
  return (
    <Layout description="Documentation site for next-export-optimize-images.">
      <main>
        <Hero />
        <Features />
        <GettingStarted />
      </main>
    </Layout>
  )
}

export default Home

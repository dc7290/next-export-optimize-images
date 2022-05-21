import Head from '@docusaurus/Head'
import Layout from '@theme/Layout'
import React from 'react'

import Hero from '../components/Hero'
import Introduction from '../components/Introduction'
import Features from '../components/Features'

const Home = () => {
  return (
    <Layout description="Documentation site for next-export-optimize-images.">
      <Head>
        <meta name="og:title" content="Next Export Optimize Images" />
      </Head>
      <main>
        <Hero />
        <Features />
        <Introduction />
      </main>
    </Layout>
  )
}

export default Home

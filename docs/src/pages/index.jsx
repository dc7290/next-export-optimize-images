import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import React from 'react'

export default function Home() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout title={siteConfig.title} description="Documentation site for next-export-optimize-images.">
      <main></main>
    </Layout>
  )
}

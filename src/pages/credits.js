import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Credits" />
    <h2>Credits</h2>
    <ul>
      <li>Oak Tree by Emily Haasch from the Noun Project</li>
      <li>Built with {` `} <a href="https://www.gatsbyjs.org">Gatsby</a></li>
    </ul>
  </Layout>
)

export default IndexPage

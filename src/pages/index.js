import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <p>A map for understanding Oakland's past</p>
    <Link to="/credits">Credits</Link>
  </Layout>
)

export default IndexPage

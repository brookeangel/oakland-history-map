import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import OaklandMap from "../components/oaklandMap"
import Header from "../components/header"
import { useStaticQuery, graphql } from "gatsby"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return(
    <Layout>
      <SEO title="Home" />
      <Header 
        siteTitle={data.site.siteMetadata.title} 
        siteDescription={data.site.siteMetadata.description} />
      <OaklandMap style={{zIndex: 0}}/>
    </Layout>
  );
}

export default IndexPage

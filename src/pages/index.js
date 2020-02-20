import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import OaklandMap from "../components/oaklandMap"

const IndexPage = () => {
  return(
    <Layout>
      <SEO title="Home" />
      <OaklandMap style={{zIndex: 0}}/>
    </Layout>
  );
}

export default IndexPage

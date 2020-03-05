import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import OaklandMap from "../components/oaklandMap"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const sites = edges.map((edge) => {
    return Object.assign(edge.node.frontmatter, {
      id: edge.node.id
    });
  });
  return(
    <Layout>
      <SEO title="Home" />
      <OaklandMap style={{zIndex: 0}} sites={{sites}} />
    </Layout>
  );
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            path
            name
            location
          }
        }
      }
    }
  }
`

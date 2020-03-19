import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, id, html } = markdownRemark
  return (
    <Layout activeSiteId={id}>
      <div>
        <h2>{frontmatter.name}</h2>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  )
}
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      id
      frontmatter {
        name
        path
        entryDate
      }
    }
  }
`

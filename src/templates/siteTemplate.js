import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter } = markdownRemark
  return (
    <Layout>
      <div>
        <h2>{frontmatter.name}</h2>
        <ReactMarkdown source={frontmatter.description} />
        <br />
        <ReactMarkdown source={frontmatter.sources} />
      </div>
    </Layout>
  )
}
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        name
        path
        entryDate
        description
        sources
      }
    }
  }
`

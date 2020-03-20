import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, id, html } = markdownRemark;
  const { startDate, endDate, name } = frontmatter;
  const start = startDate ? new Date(startDate).getFullYear() : 'unknown';
  const end = endDate ? new Date(endDate).getFullYear() : 'present';
  return (
    <Layout activeSiteId={id}>
      <div>
        <h2>{name}</h2>
        <p>
          From {start} to {end}.
        </p>
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
        startDate
        endDate
      }
    }
  }
`

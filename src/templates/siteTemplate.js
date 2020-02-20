import React from "react"
import { graphql } from "gatsby"

export default function Template({ data }) {
  console.log(data)
  const { markdownRemark } = data
  const { frontmatter } = markdownRemark
  return (
    <div>
      <h1>{frontmatter.name}</h1>
      <p>{frontmatter.description}</p>
    </div>
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
      }
    }
  }
`

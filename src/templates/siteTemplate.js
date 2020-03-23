import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import OaklandMap from "../components/oaklandMap"

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, id, html } = markdownRemark;
  const { startDate, endDate, name } = frontmatter;
  const start = startDate ? new Date(startDate).getFullYear() : 'unknown';
  const end = endDate ? new Date(endDate).getFullYear() : 'present';
  const site = Object.assign(frontmatter, { id });
  return (
    <Layout>
      <div
        style={{
          gridColumnStart: 1,
          gridColumnEnd: 2,
          gridRowStart: 2,
          gridRowEnd: 3,
        }}
      >
        <OaklandMap sites={[site]} />
      </div>
      <div
        className='pad40'
        style={{
          gridColumnStart: 2,
          gridColumnEnd: 3,
          gridRowStart: 2,
          gridRowEnd: 3,
          overflow: 'scroll',
        }}
      >
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
        location {
          coords
        }
      }
    }
  }
`

/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Header from "../components/header"
import OaklandMap from "../components/oaklandMap"
import { useStaticQuery, graphql } from "gatsby"

import 'typeface-roboto';
import "./layout.css"

const Layout = ({ activeSiteId, filter, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              path
              name
              startDate
              endDate
              location {
                coords
              }
            }
          }
        }
      }
    }
  `)

const sites = data.allMarkdownRemark.edges
  .filter((edge) => {
    if(!filter) { return true }
    const start = edge.node.frontmatter.startDate ? new Date(edge.node.frontmatter.startDate).getFullYear() : null;
    const end = edge.node.frontmatter.endDate ? new Date(edge.node.frontmatter.endDate).getFullYear() : null;
    // TODO: pass in object for filter for clarity
    const filterStart = filter[0];
    const filterEnd = filter[1];
    const startInRange = !start || start <= filterEnd;
    const endInRange = !end || end >= filterStart;
    return startInRange && endInRange;
  })
  .map((edge) => {
    return Object.assign(edge.node.frontmatter, {
      id: edge.node.id
    });
  });

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "grid",
        gridTemplateColumns: "auto 40vw",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      <Header 
        siteTitle={data.site.siteMetadata.title} 
        siteDescription={data.site.siteMetadata.description} />
      <OaklandMap
        activeSiteId={activeSiteId} 
        sites={{sites}} />
      <div
        className="pad40"
        style={{
          gridColumnStart: 2,
          gridColumnEnd: 3,
          gridRowStart: 2,
          gridRowEnd: 3,
          overflow: "scroll",
        }}
      >
        {children}
      </div>
      <footer
        className="black-background pad20"
        style={{
          gridColumnStart: 1,
          gridColumnEnd: 3,
          gridRowStart: 3,
          gridRowEnd: 4,
          textAlign: "right",
        }}
      >
        © {new Date().getFullYear()}, {` `}
        <Link to="/credits">Credits</Link>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

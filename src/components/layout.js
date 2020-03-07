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

import "./layout.css"

const Layout = ({ children }) => {
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
              location
            }
          }
        }
      }
    }
  `)

  const sites = data.allMarkdownRemark.edges.map((edge) => {
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
      <OaklandMap sites={{sites}} />
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

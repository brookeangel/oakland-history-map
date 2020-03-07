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
        position: "relative",
      }}
    >
      <Header 
        siteTitle={data.site.siteMetadata.title} 
        siteDescription={data.site.siteMetadata.description} />
      <main>
        <OaklandMap style={{zIndex: 0}} sites={{sites}} />
        <div
          className="overlay"
          style={{
            zIndex: 1,
            position: "absolute",
            bottom: 0,
            top: 0,
            right: 0,
            width: "30em",
            maxWidth: "100vw"
          }}
        >
          {children}
        </div>
      </main>
      <footer
        className="overlay"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          textAlign: "right",
          zIndex: 1,
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

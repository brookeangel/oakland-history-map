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
import { useStaticQuery, graphql } from "gatsby"

import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Header 
        siteTitle={data.site.siteMetadata.title} 
        siteDescription={data.site.siteMetadata.description} />
      <main>{children}</main>
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

/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import "./layout.css"

const Layout = ({ children }) => {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <main>{children}</main>
      <footer
        className="overlay"
        style={{
          position: "absolute",
          bottom: "50px",
          right: "50px",
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

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

import 'typeface-roboto';
import "./layout.css"

const Layout = ({ filter, children }) => {
  const data = useStaticQuery(graphql`
    query {
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
        height: "100vh",
        width: "100vw",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        gridTemplateColumns: "60vw 40vw",
      }}
    >
      <Header 
        siteTitle={data.site.siteMetadata.title} 
        siteDescription={data.site.siteMetadata.description} />
      {children}
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

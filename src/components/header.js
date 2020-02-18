import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle, siteDescription }) => (
  <header style={{ 
    position: "absolute",
    zIndex: "1",
    top: "50px",
    left: "50px",
  }} >
    <h1 className="overlay" 
      style={{ 
        margin: 0,
        display: "inline-block",
      }} >
        <Link to="/">{siteTitle}</Link>
    </h1>
    <p className="overlay" 
      style={{
        marginLeft: "60px",
      }} >
    {siteDescription}
    </p>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

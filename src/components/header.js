import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle, siteDescription }) => (
  <header 
    className="black-background pad40"
    style={{ 
      gridColumnStart: 1,
      gridColumnEnd: 3,
      gridRowStart: 1,
      gridRowEnd: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}
  >
    <h1>
        <Link to="/">{siteTitle}</Link>
    </h1>
    <p
      style={{
        marginLeft: "20px",
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

import React from "react"
import PropTypes from "prop-types"
import 'leaflet/dist/leaflet.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { navigate } from "gatsby"
import L from 'leaflet'

// Required to make Leaflet default icon work ¯\_(ツ)_/¯
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    
});

class OaklandMap extends React.Component { 
  render() {
    const position = this.props.center;
    const zoom = 13;
    const styles = {
      position: "relative",
      zIndex: 0,
      width: '100%',
      height: '100%',
      gridColumnStart: 1,
      gridColumnEnd: 2,
      gridRowStart: 2,
      gridRowEnd: 3,
    };
    const sites = this.props.sites;
    const markers = sites.map((site) => {
      const lng = site.location.coords[0];
      const lat = site.location.coords[1];
      return (
        <Marker 
          key={site.id} 
          position={[lat, lng]}
          onMouseOver={(e) => { e.target.openPopup(); }}
          onFocus={(e) => { e.target.openPopup() }}
          onMouseOut={(e) => { e.target.closePopup(); }}
          onBlur={(e) => { e.target.closePopup(); }}
          onClick={() => { navigate(site.path) }}
        >
            <Popup>
              {site.name}
            </Popup>
          </Marker>
      )
    })
    return(
      <Map center={position} zoom={zoom} style={styles}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </Map>
    );
  }
}

OaklandMap.propTypes = {
  sites: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      location: PropTypes.object.isRequired,
    })
  ).isRequired,
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default OaklandMap;

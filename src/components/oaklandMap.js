import React from "react"
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

const inactiveIcon = L.icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconSize:     [25, 35],
    
});

// TODO: use more attractive icon
const activeIcon = L.icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconSize:     [50, 70],
    
});

class OaklandMap extends React.Component { 
  render() {
    const position = [37.8044, -122.2712]
    const zoom = 13;
    const styles = {
      position: "relative",
      zIndex: 0,
      gridColumnStart: 1,
      gridColumnEnd: 2,
      gridRowStart: 2,
      gridRowEnd: 3,
    };
    const sites = this.props.sites.sites;
    const activeSiteId = this.props.activeSiteId;
    const markers = sites.map((site) => {
      const lng = site.location.coords[0];
      const lat = site.location.coords[1];
      const isActive = site.id === activeSiteId;
      return (
        <Marker 
          icon={isActive ? activeIcon : inactiveIcon }
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

export default OaklandMap;

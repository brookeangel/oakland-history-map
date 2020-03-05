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
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class OaklandMap extends React.Component { 
  render() {
    const position = [37.8044, -122.2712]
    const zoom = 13;
    const styles = {
      height: "100vh",
      width: "100vw",
      top: 0,
      left: 0,
      position: "relative",
      zIndex: 0,
    };
    const sites = this.props.sites.sites;
    const markers = sites.map((site) => {
      const coordinates = JSON.parse(site.location).coordinates;
      // For some reason, Netlify switches Lat and Long from the rest of the world
      const lat = coordinates[1];
      const long = coordinates[0];
      return (
        <Marker onClick={() => { navigate(site.path) }} key={site.id} position={[lat, long]}>
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

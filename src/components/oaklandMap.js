import React from "react"
import 'leaflet/dist/leaflet.css'
import { Map, TileLayer } from 'react-leaflet'

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
    return(
      <Map center={position} zoom={zoom} style={styles}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
    );
  }
}

export default OaklandMap;

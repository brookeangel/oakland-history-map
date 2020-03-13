import React, { Component } from "react";

export class AddressControl extends Component {
  constructor(props) {
    super(props);

    this.getAddress = this.getAddress.bind(this);
    this.fetchGeodata = this.fetchGeodata.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.updateCoords = this.updateCoords.bind(this);
  }

  getAddress() {
    return this.props.value ? this.props.value.address : "";
  }

  updateAddress(e) {
    this.props.onChange({
      address: e.target.value,
      coords: null,
    });
  }

  updateCoords(coords) {
    this.props.onChange({
      address: this.props.value.address,
      coords: coords,
    });
  }

  fetchGeodata() {
    const address = this.getAddress()
    const updateCoords = this.updateCoords;
    // In the future, we can use something more exciting than point coordinates: https://nominatim.org/release-docs/develop/api/Search/
    fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=geojson`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        const coords = data.features[0].geometry.coordinates;
        updateCoords(coords);
      })
  }

  render() {
    return(
      <div style={{
        display: "flex"
      }}>
        <input type="text" 
          onChange={this.updateAddress}
          value={this.getAddress()}
          style={{
            flexGrow: 1,
            color: "rgb(68, 74, 87)",
            position: "relative",
            fontSize: "15px",
            lineHeight: "1.5",
            padding: "16px 20px",
            margin: "0",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "rgb(223, 223, 227)",
            borderImage: "initial",
            borderRadius: "0px 5px 5px",
            outline: "0px",
          }}
        ></input>
        <button 
          onClick={this.fetchGeodata}
          style={{
            display: "block",
            width: "200px",
            color: "rgb(68, 74, 87)",
            position: "relative",
            fontSize: "15px",
            lineHeight: "1",
            padding: "16px 20px",
            margin: "0",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "rgb(223, 223, 227)",
            borderImage: "initial",
            borderRadius: "5px",
            outline: "0px",
            cursor: "pointer",
          }}
        >Check Address</button>
      </div>
    );
  }
}

export const AddressPreview = props => {
  return(
    <div>
      <p>Address: {props.value.address}</p>
      <p>Geodata: {props.value.coords}</p>
    </div>
  );
};

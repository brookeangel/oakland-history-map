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
    return this.props.value ? this.props.value.get('address') : "";
  }

  getCoords() {
    return this.props.value ? this.props.value.get('coords') : "";
  }

  updateAddress(e) {
    this.props.onChange((this.props.value || Map()).set('address', e.target.value))
  }

  updateCoords(coords) {
    this.props.onChange((this.props.value || Map()).set('coords', coords))
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
        // TODO: the first feature doesn't always exist - needs error handling
        const coords = data.features[0].geometry.coordinates;
        updateCoords(coords);
      })
  }

  render() {
    const sharedStyles = {
      position: "relative",
      fontSize: "15px",
      lineHeight: "1.5",
      padding: "16px 20px",
      margin: "0",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "rgb(223, 223, 227)",
      borderImage: "initial",
      outline: "0px",
    }
    return(
      <div>
        <div style={{
          display: "flex"
        }}>
          <input type="text" 
            onChange={this.updateAddress}
            value={this.getAddress()}
            style={Object.assign(sharedStyles, {
              flexGrow: 1,
              borderRadius: "0px 5px 5px",
            })}></input>
          <button 
            onClick={this.fetchGeodata}
            style={Object.assign(sharedStyles, {
              borderRadius: "5px",
              cursor: "pointer",
            })}>Fetch Coordinates</button>
        </div>
        Coords: {this.getCoords().join(', ')}
      </div>
    );
  }
}

export const AddressPreview = props => {
  // Never previews, bug with Netlfy CMS: https://github.com/netlify/netlify-cms/issues/2150
  if(!props.value) { return '' }

  return(
    <div>
      <p>Address: {props.value.get('address')}</p>
      <p>Geodata: {props.value.get('coords')}</p>
    </div>
  );
};

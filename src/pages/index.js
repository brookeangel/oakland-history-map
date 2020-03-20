import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Slider, Typography } from '@material-ui/core';

class IndexPage extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {yearRange: [1800,2020]};
    this.onChangeYears = this.onChangeYears.bind(this);
  }

  onChangeYears(event, value) {
    this.setState({
      yearRange: value
    });
  }

  render() {
    const min=1800;
    const max=2020;
    const marks = [
      {
        value: 1800,
        label: '1800',
      },
      {
        value: 2020,
        label: '2020',
      },
    ];

    return(
      <Layout filter={this.state.yearRange}>
        <SEO title="Home" />
        <Typography id="year-slider" gutterBottom>
          Year Range
        </Typography>
        <Slider
          value={this.state.yearRange}
          aria-labelledby="year-slider"
          step={1}
          min={min}
          max={max}
          valueLabelDisplay="auto"
          onChange={this.onChangeYears}
          marks={marks}
        />
      </Layout>
    );
  }
}

export default IndexPage

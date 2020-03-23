import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import OaklandMap from "../components/oaklandMap"
import { Slider, Typography } from '@material-ui/core';

class IndexPage extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {yearRange: [1800,2020]};
    this.onChangeYears = this.onChangeYears.bind(this);
    this.filteredSites = this.filteredSites.bind(this);
  }

  onChangeYears(event, value) {
    this.setState({
      yearRange: value
    });
  }

  filteredSites() {
    return this.props.data.allMarkdownRemark.edges
      .filter((edge) => {
        const {startDate, endDate} = edge.node.frontmatter;
        const startYear = startDate ? new Date(startDate).getFullYear() : null;
        const endYear = endDate ? new Date(endDate).getFullYear() : null;

        const filterStart = this.state.yearRange[0];
        const filterEnd = this.state.yearRange[1];

        const startInRange = !startYear || startYear <= filterEnd;
        const endInRange = !endYear || endYear >= filterStart;
        return startInRange && endInRange;
      })
      .map((edge) => {
        return Object.assign(edge.node.frontmatter, {
          id: edge.node.id
        });
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
        <div style={{
          gridColumnStart: 1,
          gridColumnEnd: 3,
          gridRowStart: 2,
          gridRowEnd: 3,
          position: 'relative',
          width: '100%',
          height: '100%',
        }}>
        <OaklandMap 
          center={[37.8044, -122.2712]}
          sites={this.filteredSites()} />
          <div style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '20em',
            backgroundColor: '#FFF',
            padding: '20px 40px',
          }}>
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
          </div>
        </div>
      </Layout>
    );
  }
}

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            path
            name
            startDate
            endDate
            location {
              coords
            }
          }
        }
      }
    }
  }
`

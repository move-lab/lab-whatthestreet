import React, { Component } from "react";
import ReactMapboxGl, { GeoJSONLayer, ScaleControl, ZoomControl } from "react-mapbox-gl";

import { unfold } from '../../shared/utils/unfold';

const containerStyle = {
  height: "100vh",
  width: "100%"
};

class Map extends Component {

  constructor(props) {
    super(props);

    const unfolder = unfold();
    const geoJson = unfolder.geoJsonStreetAnimation(
      props.itemData.original,
      props.itemData.coiled,
      props.itemData.properties.origin,
      1,
      1
    );

    console.log(geoJson);

    
    this.state = {
      maxBounds: null,
      geojson: geoJson
    };
  }

  // componentDidMount() {
  //   const unfolder = unfold();
  //   const geoJson = unfolder.geoJsonStreetAnimation(
  //     this.props.itemData.original,
  //     this.props.itemData.coiled,
  //     this.props.itemData.properties.origin,
  //     1,
  //     1
  //   );

  //   console.log(geoJson);

  //   this.setState({
  //     geojson: geoJson
  //   });
  // }

  render() {

    // HOW TO STYLE GEOJSON LAYER ???
    // IT IS CORRECT

    return (
      <ReactMapboxGl
        style="mapbox://styles/mapbox/streets-v9"
        accessToken="***REMOVED***"
        center={[ 13.32094, 52.51650 ]}
        zoom={[17]}
        movingMethod="jumpTo"
        containerStyle={containerStyle}
      >
        <ScaleControl/>
        <ZoomControl/>
        <GeoJSONLayer
          data={this.state.geojson}
        />
      </ReactMapboxGl>
    );
  }
}

export default Map;

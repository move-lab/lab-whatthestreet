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
    // THE GEOJSON IS SET CORRECTLY, see for http://localhost:4000/berlin/explore/car/lanes/8?bike=0.53&rail=0.24&car=0.24
    // CORRESPONDING GEOJSON: 

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
          linePaint={{
            "line-color": "#00f",
            "line-width": 5
          }}
          lineLayout={{
            "line-join": "round",
            "line-cap": "round"
          }}
        />
      </ReactMapboxGl>
    );
  }
}

export default Map;

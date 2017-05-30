import React, { Component } from "react";
import ReactMapboxGl, { GeoJSONLayer, ScaleControl, ZoomControl } from "react-mapbox-gl";

import { unfold } from '../../shared/utils/unfold';

const containerStyle = {
  height: "100vh",
  width: "100%"
};

class Map extends Component {

  static propTypes = {
    itemData: React.PropTypes.object,
    onMapLoaded: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    // Unfold to final street for now
    const unfolder = unfold();
    const geoJson = unfolder.geoJsonStreetAnimation(
      props.itemData.original,
      props.itemData.coiled,
      props.itemData.properties.origin,
      1,
      1
    );

    this.state = {
      geojson: geoJson
    };
  }

  // componentDidMount() {
  // Here we could do the unfold animation
  // }

  render() {

    return (
      <ReactMapboxGl
        style="mapbox://styles/mapbox/streets-v9"
        accessToken="***REMOVED***"
        center={[ this.props.itemData.original.destination.lon, this.props.itemData.original.destination.lat ]}
        zoom={[17]}
        movingMethod="jumpTo"
        containerStyle={containerStyle}
        onStyleLoad={this.props.onMapLoaded}
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

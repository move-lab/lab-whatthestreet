import React, { Component } from "react";
import ReactMapboxGl, { GeoJSONLayer, ScaleControl, ZoomControl } from "react-mapbox-gl";

import { unfold } from '../../shared/utils/unfold';

const containerStyle = {
  height: "100vh",
  width: "100%"
};

class Map extends Component {

  static propTypes = {
    areaType: React.PropTypes.string,
    laneData: React.PropTypes.object,
    parkingData: React.PropTypes.object,
    onMapLoaded: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    let geojson;
    let center;

    if (props.areaType === 'parking') {
      geojson = {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [props.parkingData.coordinates],
        }
      }

      center = props.parkingData.center;
    } else {
      // Unfold to final street for now
      const unfolder = unfold();
      geojson = unfolder.geoJsonStreetAnimation(
        props.laneData.original,
        props.laneData.coiled,
        props.laneData.properties.origin,
        1,
        1
      );

      center = [ props.laneData.original.destination.lon, props.laneData.original.destination.lat ]
    }

    this.state = {
      center : center,
      geojson: geojson
    };
  }

  // componentWillReceiveProps() {
    // We should have logic here when we will avoid remounting map each time
  // }

  render() {

    return (
      <ReactMapboxGl
        style="mapbox://styles/mapbox/streets-v9"
        accessToken="***REMOVED***"
        center={this.state.center}
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

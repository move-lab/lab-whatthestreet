import React, { Component } from "react";
import ReactMapboxGl, { ScaleControl, ZoomControl } from "react-mapbox-gl";
import TWEEN from 'tween.js';

import { unfold } from '../../shared/utils/unfold';

const containerStyle = {
  display: "flex",
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

    this.onMapLoaded = this.onMapLoaded.bind(this);
    this.lastComputedId = 0;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.areaType !== this.props.areaType) {
      this.renderData(newProps);
    } else {
      if (this.props.areaType === 'lanes' &&
          newProps.laneData !== null &&
          newProps.laneData._id !== this.lastComputedId) {
        this.renderData(newProps);
      }
      if (this.props.areaType === 'parking' &&
          newProps.parkingData !== null &&
          newProps.parkingData.id !== this.lastComputedId) {
        this.renderData(newProps);
      }
    }
  }

  onMapLoaded(map) {
    this.map = map;
    // Add a layer we will use to draw animation and streets
    this.map.addLayer({
      id: 'data',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          "type": "FeatureCollection",
          "properties": {
            "name": "data"
          },
          "features": []
        }
      },
      paint: {
        "line-color": "#FF6819",
        "line-width": 5
      },
      layout: {
        "line-join": "round",
        "line-cap": "round"
      }
    });
    this.props.onMapLoaded();
    this.renderData(this.props);
  }

  animate() {
    // TODO STOP LOOP
    return window.requestAnimationFrame(() => {
      TWEEN.update();
      this.animate();
    });
  }

  renderParking(props) {
    let geojson = {
      type: 'Feature',
      properties: {
        "name": "..."
      },
      geometry: {
        type: 'Polygon',
        coordinates: [props.parkingData.coordinates],
      }
    }

    // For rotation use: https://github.com/Turfjs/turf/tree/master/packages/turf-transform-rotate
    
    let center = props.parkingData.center;

    if(this.map) {
      this.map.jumpTo({
        center: center
      });
      this.map.getSource('data').setData(geojson);
    }
  }

  renderLane(props) {
    if(this.map) {
      let geojson;
      const unfolder = unfold();
      this.unfoldTween = new TWEEN.Tween({progress: 0}).to({ progress: 1 }, 2000);
      this.stitchTween = new TWEEN.Tween({progress: 0}).to({ progress: 1 }, 2000);
      this.unfoldTween.chain(this.stitchTween);
      this.unfoldTween.onUpdate((progress) => {
        geojson = unfolder.geoJsonStreetAnimation(
          props.laneData.original,
          props.laneData.coiled,
          props.laneData.properties.origin,
          progress,
          1
        );
        this.map.getSource('data').setData(geojson);
      });
      this.stitchTween.onUpdate((progress) => {
        geojson = unfolder.geoJsonStreetAnimation(
          props.laneData.original,
          props.laneData.coiled,
          props.laneData.properties.origin,
          1,
          progress
        );
        this.map.getSource('data').setData(geojson);
      });

      this.unfoldTween.start();
      this.animate();

      let center = [ 
        props.laneData.original.destination.lon, 
        props.laneData.original.destination.lat
      ]

      this.map.jumpTo({
        center: center
      });
    }
  }

  renderData(props) {
    if (props.areaType === 'parking') {
      if(!props.parkingData) {
        return;
      }
      this.renderParking(props);
      this.lastComputedId = props.parkingData.id;
    } else {
      if(!props.laneData) {
        return;
      }
      this.renderLane(props);
      this.lastComputedId = props.laneData._id;
    }
  }

  render() {
    console.log('rendermap')
    return (
      <ReactMapboxGl
        style="mapbox://styles/mapbox/streets-v9"
        accessToken="***REMOVED***"
        containerStyle={containerStyle}
        onStyleLoad={this.onMapLoaded}
      >
        <ScaleControl/>
        <ZoomControl/>
      </ReactMapboxGl>
    );
  }
}

export default Map;

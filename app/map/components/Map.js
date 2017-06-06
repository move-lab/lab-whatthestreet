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

    const defaultCenter = [];
    defaultCenter.push(0);
    defaultCenter.push(0);
    this.center = defaultCenter;
    this.zoom = 15;
    this.lastComputedId = 0;
    
    this.computeNewDataToDisplay(props);
  }

  onMapLoaded(map) {
    this.map = map;
    this.map.jumpTo({center: this.center, zoom: this.zoom});
    this.map.addLayer({
      id: 'data',
      type: 'line',
      source: {
        type: 'geojson',
        data: this.geojson
      },
      paint: {
        "line-color": "#00f",
        "line-width": 5
      },
      layout: {
        "line-join": "round",
        "line-cap": "round"
      }
    });
    this.props.onMapLoaded();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.areaType !== this.props.areaType) {
      this.computeNewDataToDisplay(newProps);
    } else {
      if (this.props.areaType === 'lanes' &&
          newProps.laneData !== null &&
          newProps.laneData._id !== this.lastComputedId) {
        console.log('compute lane data')
        this.computeNewDataToDisplay(newProps);
      }
      if (this.props.areaType === 'parking' &&
          newProps.parkingData !== null &&
          newProps.parkingData.id !== this.lastComputedId) {
        console.log('compute parking data')
        this.computeNewDataToDisplay(newProps);
      }
    }
  }

  computeNewDataToDisplay(newProps) {
    console.log('computeDataToDisplay');
    // reset previous
    this.setState({
      geojson: null
    });

    let geojson;
    let geojsonItem;
    let center;

    if (newProps.areaType === 'parking') {

      if(!newProps.parkingData) {
        return;
      }

      geojson = {
        type: 'Feature',
        properties: {
          "name": "..."
        },
        geometry: {
          type: 'Polygon',
          coordinates: [newProps.parkingData.coordinates],
        }
      }

      // For rotation use: https://github.com/Turfjs/turf/tree/master/packages/turf-transform-rotate
      
      center = newProps.parkingData.center;
      this.lastComputedId = newProps.parkingData.id;
    } else {

      if(!newProps.laneData) {
        return;
      }
      // Unfold to final street for now
      const unfolder = unfold();
      geojson = unfolder.geoJsonStreetAnimation(
        newProps.laneData.original,
        newProps.laneData.coiled,
        newProps.laneData.properties.origin,
        0,
        1
      );

      center = [ 
        newProps.laneData.original.destination.lon, 
        newProps.laneData.original.destination.lat
      ]

      this.lastComputedId = newProps.laneData._id;

      if(this.map) {
        this.unfoldTween = new TWEEN.Tween({progress: 0}).to({ progress: 1 }, 2000);
        this.unfoldTween.start();
        this.animate();
        this.unfoldTween.onUpdate((progress) => {
          geojson = unfolder.geoJsonStreetAnimation(
            newProps.laneData.original,
            newProps.laneData.coiled,
            newProps.laneData.properties.origin,
            progress,
            1
          );
          this.map.getSource('data').setData(geojson);
        });
        this.unfoldTween.onComplete(() => {
          this.stitchTween = new TWEEN.Tween({progress: 0}).to({ progress: 1 }, 2000);
          this.stitchTween.start();
          this.stitchTween.onUpdate((progress) => {
            // Better, chain tween: https://github.com/tweenjs/tween.js/blob/master/docs/user_guide.md#chain
            geojson = unfolder.geoJsonStreetAnimation(
              newProps.laneData.original,
              newProps.laneData.coiled,
              newProps.laneData.properties.origin,
              1,
              progress
            );
            this.map.getSource('data').setData(geojson);
          });
        });
      }

    }

    this.center = center;
    this.geojson = geojson;

    if(this.map) {
      this.map.jumpTo({
        center: center
      });
      // console.log('new GEOJSON');
      // console.log(geojson);
      // this.map.getSource('data').setData(geojson);
    }
  }

  animate() {
    // TODO STOP LOOP
    return window.requestAnimationFrame(() => {
      TWEEN.update();
      this.animate();
    });
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

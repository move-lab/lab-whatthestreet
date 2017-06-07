import React, { Component } from "react";
import ReactMapboxGl, { ScaleControl, ZoomControl } from "react-mapbox-gl";
import TWEEN from 'tween.js';
import { bbox } from 'turf';
import _throttle from 'lodash.throttle';

import { unfold } from '../../shared/utils/unfold';
import {
  calculateBendWay,
  getLongestTranslation,
  getZoomLevel
} from '../../shared/utils/geoutils';

const containerStyle = {
  display: "flex",
  height: "100vh",
  width: "100%"
};

const unfolder = unfold();

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
    this.drawLaneFrame = this.drawLaneFrame.bind(this);
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

  /*
   LANES RENDER UTILITIES
   */

  unfold(laneData, progressUnfold, progressStitch) {
    return unfolder.geoJsonStreetAnimation(
      laneData.original,
      laneData.coiled,
      laneData.properties.origin,
      progressUnfold,
      progressStitch
    );
  }

  drawLaneFrame(laneData, progressUnfold, progressStitch) {
    const geojson = this.unfold(laneData, progressUnfold, progressStitch)
    this.map.getSource('data').setData(geojson);
    return geojson;
  }

  renderLane(props) {
    if(this.map) {
      // Center map on coiler line coord
      let center = [ 
        props.laneData.properties.origin.lon, 
        props.laneData.properties.origin.lat
      ]
      // Get max zoom lvl
      const meterPerPixel = 1.2672955975;
      const maxZoom = getZoomLevel(props.laneData.properties.origin.lat, meterPerPixel);

      // Init map at the position of the street
      this.map.jumpTo({
        center: center,
        zoom: maxZoom
      });

      // Compute bbox start and bbox end
      const geoJsonFolded = this.unfold(props.laneData, 0, 0);
      const geoJsonUnfolded = this.unfold(props.laneData, 1, 1);

      const bboxFolded = bbox(geoJsonFolded);
      const bboxUnfolded = bbox(geoJsonUnfolded);
      const dLonWest = bboxFolded[0] - bboxUnfolded[0];
      const dLonEast = bboxFolded[2] - bboxUnfolded[2];
      const dLatNorth = bboxFolded[1] - bboxUnfolded[1];
      const dLatSouth = bboxFolded[3] - bboxUnfolded[3];

      // Fit bounds to the street folded
      this.map.fitBounds(bboxFolded, {
        maxZoom: maxZoom,
        padding: 100
      });

      // This depends on how much movement is in the street geometry
      const timeUnfold = calculateBendWay(props.laneData.original.vectors) * 200000;
      // This depends on how long the biggest translation is (when a street consists of multiple segments)
      const timeUnstitch = getLongestTranslation(props.laneData.original.vectors) * 200000;
      let unstitchDelay = 200;
      // When a street consists of only piece/pieces are very close together, remove the delay
      if (timeUnstitch < 100) { 
        unstitchDelay = 0; 
      } 

      // Draw it a first time
      this.drawLaneFrame(props.laneData, 0, 0);

      const throttledDrawLaneFrame = _throttle(this.drawLaneFrame, 100);

      const unfoldTween = new TWEEN.Tween({progress: 0}).to({ progress: 1 }, timeUnfold).delay(1000);
      const stitchTween = new TWEEN.Tween({progress: 0}).to({ progress: 1 }, timeUnstitch).delay(unstitchDelay);
      unfoldTween.chain(stitchTween);
      unfoldTween.onUpdate((progressUnfold) => {
        throttledDrawLaneFrame(props.laneData, progressUnfold, 0);
      });
      stitchTween.onUpdate((progressStitch) => {
        throttledDrawLaneFrame(props.laneData, 1, progressStitch);
      });

      unfoldTween.start();
      this.animate();

      // Move bounds to the bboxUnfolded view in
      // the same time than the animation unfold
      this.map.fitBounds(bboxUnfolded, {
        maxZoom: maxZoom,
        padding: 100,
        linear: true,
        duration: timeUnfold + 1000
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

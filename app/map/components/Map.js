import React, { Component } from "react";
import ReactMapboxGl, { ScaleControl, ZoomControl } from "react-mapbox-gl";
import TWEEN from 'tween.js';
import { bbox } from '@turf/turf';
import rotate from '@turf/transform-rotate';
import _throttle from 'lodash.throttle';

import MapActions from './MapActions';

import { unfold } from '../../shared/utils/unfold';
import {
  calculateBendWay,
  getLongestTranslation,
  getZoomLevel
} from '../../shared/utils/geoutils';
import * as identifiers from '../../statemanagement/constants/identifiersConstants';

const containerStyle = {
  display: "flex",
  height: "100vh",
  width: "100%"
};

const unfolder = unfold();

class Map extends Component {

  static propTypes = {
    activeVehicle: React.PropTypes.string,
    areaType: React.PropTypes.string,
    laneData: React.PropTypes.object,
    parkingData: React.PropTypes.object,
    onMapLoaded: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    this.onMapLoaded = this.onMapLoaded.bind(this);
    this.drawLaneFrame = this.drawLaneFrame.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.toggleLayer = this.toggleLayer.bind(this);
    this.lastComputedId = 0;
    this.geojson = {
      "type": "FeatureCollection",
      "properties": {
        "name": "data"
      },
      "features": []
    };

    this.state = {
      activeLayer: identifiers.satelliteLayer
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.animating) {
      return;
    }
    if (newProps.areaType === 'lanes' &&
        newProps.laneData !== null &&
        newProps.laneData._id !== this.lastComputedId) {
      this.renderData(newProps);
    }
    if (newProps.areaType === 'parking' &&
        newProps.activeVehicle !== 'rail' &&
        newProps.parkingData !== null &&
        newProps.parkingData.id !== this.lastComputedId) {
      this.renderData(newProps);
    }
    if (newProps.areaType === 'parking' &&
        newProps.activeVehicle === 'rail' &&
        newProps.laneData !== null &&
        newProps.laneData._id !== this.lastComputedId) {
      this.renderData(newProps);
    }
  }

  onMapLoaded(map) {
    this.map = map;
    // Set up event handler for style switching
    this.map.on('style.load', () => {
      this.addBaseLayer();
    });
    this.addBaseLayer();
    this.renderData(this.props);
    this.props.onMapLoaded();
  }

  addBaseLayer() {
    // Add a layer we will use to draw animation and streets
    this.map.addLayer({
      id: 'data',
      type: 'line',
      source: {
        type: 'geojson',
        data: this.geojson
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
  }

  zoomIn() {
    if(this.map) {
      this.map.zoomTo(this.map.getZoom() + 0.5);
    }
  }

  zoomOut() {
    if(this.map) {
      this.map.zoomTo(this.map.getZoom() - 0.5);
    }
  }

  toggleLayer() {
    if(this.animating) {
      return;
    }
    if(this.state.activeLayer === "satellite-streets-v9") {
      const streetLayer = "streets-v9"
      this.setState({
        activeLayer: streetLayer
      });
      this.map.setStyle(`mapbox://styles/mapbox/${streetLayer}`, true);
    } else {
      const satelliteLayer = "satellite-streets-v9"
      this.setState({
        activeLayer: satelliteLayer
      });
      this.map.setStyle(`mapbox://styles/mapbox/${satelliteLayer}`, true);
    }
  }

  animate(startingAnimation) {
    if(startingAnimation) {
      this.animating = true;
    }
    return window.requestAnimationFrame(() => {
      TWEEN.update();
      if(this.animating) {
        this.animate();
      }
    });
  }

  /*
    RENDER PARKING
  */

  renderParking(props) {
    const self = this;
    if(this.map) {
      // parking final geojson
      const parkingFinal = {
        type: 'Feature',
        properties: {
          "name": "..."
        },
        geometry: {
          type: 'Polygon',
          coordinates: [props.parkingData.coordinates],
        }
      }
      // initial parking geojson (like it is in the scroll experience)
      const parkingRotatedStart = rotate(parkingFinal, props.parkingData.rotation);

      // Init map and fit to initial parking geojson
      this.map.getSource('data').setData(parkingRotatedStart);
      const parkingRotatedStartBbox = bbox(parkingRotatedStart);
      const parkingEndBbox = bbox(parkingFinal);
      this.map.fitBounds(parkingRotatedStartBbox, {
        maxZoom: 19,
        padding: 100,
        linear: true,
        duration: 0
      });

      // Start animating from props.parkingData.rotation to rotation = 0, in 2 s
      const rotationTween = new TWEEN.Tween({rotation: props.parkingData.rotation})
                                      .to({ rotation: 0 }, 1000)
                                      .delay(1000);
      rotationTween.onUpdate(function() {
        const parkingRotated = rotate(parkingFinal, this.rotation);
        self.map.getSource('data').setData(parkingRotated);
      });
      rotationTween.onComplete(() => {
        this.animating = false;
        // Register final animation state in case we switch layer style
        this.geojson = parkingFinal;
        // Clean listener because it can trigger onComplete afterwise if not
        TWEEN.removeAll();
      })

      rotationTween.start();
      this.animate(true);

      // Fit bounds to end position
      setTimeout(() => {
        this.map.fitBounds(parkingEndBbox, {
          maxZoom: 19,
          padding: 200,
          linear: true,
          duration: 1000
        });
      }, 1000);
      
    }
  }

  /*
    RENDER STREET UTILITIES
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
        // TODO, the computation of the unfolding is taking too long even throttle to 100ms and 
        // drop the FPS on large geojson
        // if time, improve unfold method to be more efficient
        throttledDrawLaneFrame(props.laneData, progressUnfold, 0);
      });
      stitchTween.onUpdate((progressStitch) => {
        throttledDrawLaneFrame(props.laneData, 1, progressStitch);
      });
      stitchTween.onComplete(() => {
        this.animating = false;
        // Register geojson final in case we stich layers
        this.geojson = geoJsonUnfolded;
        // Clean listener because it can trigger onComplete afterwise if not
        TWEEN.removeAll();
      })

      unfoldTween.start();
      this.animate(true);

      // Move bounds to the bboxUnfolded view in
      // the same timespan than the animation unfold
      setTimeout(() => {
        this.map.fitBounds(bboxUnfolded, {
          maxZoom: maxZoom,
          padding: 100,
          linear: true,
          duration: timeUnfold + timeUnstitch
        });
      }, 1000 + unstitchDelay);
      
    }
  }

  renderData(props) {
    if (props.areaType === 'parking' && this.props.activeVehicle !== 'rail') {
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
    return (
      <ReactMapboxGl
        style={`mapbox://styles/mapbox/${this.state.activeLayer}`}
        accessToken="***REMOVED***"
        containerStyle={containerStyle}
        onStyleLoad={this.onMapLoaded}
      >
        <ScaleControl/>
        <MapActions
          activeLayer={this.state.activeLayer}
          zoomIn={this.zoomIn}
          zoomOut={this.zoomOut}
          toggleLayer={this.toggleLayer}
        />
      </ReactMapboxGl>
    );
  }
}

export default Map;

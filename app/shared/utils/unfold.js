import * as turf from '@turf/turf';

export const unfold = function () {
  function geoJsonStreetAnimation(originalStreet, coiledStreet, originLatLon, progressUnfold, progressRestitch) {
    const origin = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [originLatLon.lon, originLatLon.lat]
      }
    };

    // let cursor = JSON.parse(JSON.stringify(origin));
    let coordinates = [];
    let cursor = origin;

    const originalGeometry = originalStreet.vectors;
    const coiledGeometry = coiledStreet.vectors;

    let angleCounter = 0;

    const lineStrings = [];
    for (let j = 0; j < coiledGeometry.length; j++) {
      // coiledGeometry[length, angle]
      // originalGeometry[length, bearing, type{0:translation, 1:street}, originalSegmentNumber]
      
      const angleDiff = getAngleDifference(originalGeometry[j][1], coiledGeometry[j][1]);
      const distanceDiff = originalGeometry[j][0] - coiledGeometry[j][0];

      const vector = coiledGeometry[j];

      let distance = vector[0] + distanceDiff * progressUnfold;
      if (originalGeometry[j][2] == 0) {
        distance *= progressRestitch;
      }

            // 1st coordinate
      if (originalGeometry[j][2] != 0) {
        coordinates.push(cursor.geometry.coordinates);
      }
      // console.log(cursor.geometry.coordinates);

      angleCounter += vector[1] + angleDiff * progressUnfold;

      cursor = turf.destination(cursor, distance, angleCounter);

            // 2st coordinate
      if (originalGeometry[j][2] != 0) {
        coordinates.push(cursor.geometry.coordinates);
      }

            // if new vector is translation
      if (originalGeometry[j][2] == 0 && coordinates.length > 0) {
        lineStrings.push(turf.lineString(coordinates));
        coordinates = [];
      }
    }

    if (coordinates.length > 0) {
      lineStrings.push(turf.lineString(coordinates));
      coordinates = [];
    }

    const featureCollection = turf.featureCollection(lineStrings);
    return featureCollection;
  }


    // Returns the closest angular difference between two angles (between -180 and 180)
  function getAngleDifference(angle1, angle2) {
    let d = angle1 - angle2;
    while (d < -180) {
      d += 360;
    }
    while (d > 180) {
      d -= 360;
    }
    return d;
  }


  return {
    geoJsonStreetAnimation
  };
};

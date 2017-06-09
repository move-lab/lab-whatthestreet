import turf from '@turf/turf';

export const unfold = function () {
  function rotateVectorStreet(vectorStreet, bearing) {
    vectorStreet.vectors[0].deltaBearing += bearing;
  }

  function setRotationOfVectorStreet(vectorStreet, bearing) {
    vectorStreet.vectors[0].deltaBearing = bearing;
  }

  function getObjectBearing(vectorStreet) {
    const street = getStreetWithCoordinates(vectorStreet);
    const coordinates = street.coordinates;
    const lastCoordinate = coordinates[coordinates.length - 1];
    const objectBearing = getBearing(vectorStreet.origin, lastCoordinate);
    return objectBearing;
  }

  function calculateAndSetObjectBearing(vectorStreet) {
    vectorStreet.objectBearing = roundToDecimals(getObjectBearing(vectorStreet), 3);
  }

  function getDistanceInPixels(meter, meterPerPixel) {
    return meter / meterPerPixel; // e.g. you have 2 meters distance, and one pixel equals 4 meters, than it returns 0.5 pixel
  }

  function getDistanceInMeters(pixel, meterPerPixel) {
    return meterPerPixel / meter; // e.g. you have 2 meters distance, and one pixel equals 4 meters, than it returns 0.5 pixel
  }

  function geoJsonStreetAnimation(originalStreet, coiledStreet, originLatLon, progressUnfold, progressRestitch) {
    const origin = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [originLatLon.lon, originLatLon.lat],
      },
    };

    // let cursor = JSON.parse(JSON.stringify(origin));
    let coordinates = [];
    let cursor = origin;

    const originalGeometry = originalStreet.vectors;
    const coiledGeometry = coiledStreet.vectors;

    let angleCounter = 0;

    const lineStrings = [];
    for (let j = 0; j < coiledGeometry.length; j++) {
      const angleDiff = getAngleDifference(originalGeometry[j].deltaBearing, coiledGeometry[j].deltaAngle);
      const distanceDiff = originalGeometry[j].distance - coiledGeometry[j].distance;

      const vector = coiledGeometry[j];

      let distance = vector.distance + distanceDiff * progressUnfold;
      if (originalGeometry[j].type == 'translation') {
        distance *= progressRestitch;
      }

            // 1st coordinate
      if (originalGeometry[j].type != 'translation') {
        coordinates.push(cursor.geometry.coordinates);
      }

      angleCounter += vector.deltaAngle + angleDiff * progressUnfold;

      cursor = turf.destination(cursor, distance, angleCounter);

            // 2st coordinate
      if (originalGeometry[j].type != 'translation') {
        coordinates.push(cursor.geometry.coordinates);
      }

            // if new vector is translation
      if (originalGeometry[j].type == 'translation' && coordinates.length > 0) {
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

  function getStreetWithCoordinates(vectorStreet) {
        // preparing output
    const output = JSON.parse(JSON.stringify(vectorStreet));
    output.coordinates = [];
    delete output.vectors;
    delete output.destination;
    delete output.objectBearing;

    const vectors = vectorStreet.vectors;
    let bearingCounter = 0;

    let cursor = output.origin;

    for (let i = 0; i < vectors.length; i++) {
      const vector = vectors[i];
      bearingCounter += vector.deltaBearing;

      if (i == 0) { // First vector
        output.coordinates.push(cursor); // First coordinate
      }

            // Move cursor forward
      cursor = getDestination(cursor, vector.distance, bearingCounter);
      output.coordinates.push(cursor);

      if (i == vectors.length - 1) { // Last vector
        output.destination = cursor;
                // Destination will not be the same due to mathematical incorrectness
      }
    }
    return output;
  }

    // Adds intermediate points to the street, so you have more coordinates to bend
  function subdivideVectorStreet(vectorStreet, maximumLengthInMeter) {
    const output = JSON.parse(JSON.stringify(vectorStreet));
    delete output.vectors;

    output.vectors = [];

    const vectors = vectorStreet.vectors;
    const originalLengths = [];
    const subVectors = [];

    const maximumLengthInKm = maximumLengthInMeter / 1000;
    for (var i = 0; i < vectors.length; i++) {
      const vector = vectors[i];
      const distance = vector.distance;
      const numberOfParts = Math.max(Math.ceil(distance / maximumLengthInKm), 1);
      const partLength = distance / numberOfParts;

      originalLengths.push(distance);
      subVectors.push(numberOfParts);


      for (let j = 0; j < numberOfParts; j++) {
        const newVector = JSON.parse(JSON.stringify(vector));
        newVector.originalNumber = i;
        newVector.distance = partLength;

        if (j > 0) {
          newVector.deltaBearing = 0;
        }
        output.vectors.push(newVector);
      }
    }

    output.originalLengths = originalLengths;
    output.subVectors = subVectors;

        // Simplify
    output.length = roundToDecimals(output.length, 3);
    output.coilStart = roundToDecimals(output.coilStart, 3);
    output.coilEnd = roundToDecimals(output.coilEnd, 3);
    output.objectBearing = roundToDecimals(output.objectBearing, 3);
    output.totalVariation = roundToDecimals(output.totalVariation, 3);
    for (var i = 0; i < output.originalLengths.length; i++) {
      output.originalLengths[i] = roundToDecimals(output.originalLengths[i], 3);
    }
    for (var i = 0; i < output.vectors.length; i++) {
      output.vectors[i].distance = roundToDecimals(output.vectors[i].distance, 8);
    }
    output.tags.area = roundToDecimals(output.tags.area, 4);
    output.tags.length = roundToDecimals(output.tags.length, 4);

    return output;
  }


    // Returns the street object with original structure, but unfolded according to input properties
    //
    //   closeGaps: How much gaps should be closed (for streets which split up)
    //      From:  0 (original gap)
    //      To:    1 (no gap)
    //      Larger numbers will result in larger gaps (don't use larger numbers)
    //
    //   unfold: How much the street path should be unfolded
    //      From:  1 (original path)
    //      To: infinity (values between 5 and 15 give a good, but still curvy result)
    //
    //   straightenPathConnections:
    //      From:  0 (original angle)
    //      To:    1 (the end of one vector will be the start of another one)

  function getUnfoldedVectorStreet(street, unfold, closeGaps, straightenPathConnections) {
    const output = JSON.parse(JSON.stringify(street));

    closeGaps = 1 - closeGaps;
    straightenPathConnections = 1 - straightenPathConnections;

    let previousVectorType;
    const newVectors = JSON.parse(JSON.stringify(street.vectors)); // copy vectors

    for (let i = 0; i < newVectors.length; i++) {
      const vector = newVectors[i];

            // If type vector is translation (should not be drawn)
      if (vector.type == 'translation') {
        vector.deltaBearing = roundToDecimals(vector.deltaBearing * closeGaps, 5);
        vector.distance = roundToDecimals(vector.distance * closeGaps, 8);
      }

            // For all vectors except the first one
      if (i != 0) {
        vector.deltaBearing = roundToDecimals(vector.deltaBearing / unfold, 5);
        if (previousVectorType == 'translation') {
          vector.deltaBearing = roundToDecimals(vector.deltaBearing * straightenPathConnections, 5);
        }
      }

            // Last Vector
            // if (i == newVectors.length - 1) {};

      previousVectorType = vector.type;
    }


    output.vectors = newVectors;
    return output;
  }


    // Converts coordinates based street into vector based
  function getStreetWithVectors(street) {
        // Copy street and remove unnecessary data
    const output = JSON.parse(JSON.stringify(street));
    output.vectors = [];
    delete output.components;
    delete output.nodes;
    delete output.ways;

    let length = 0;
    const components = street.components;
    let previousNode;
    let previousBearing;

    const bounds = {
      sw: [null, null],
      ne: [null, null],
    };

    for (let c = 0; c < components.length; c++) {
      const component = components[c];
      const paths = component;

      for (let p = 0; p < paths.length; p++) {
        const path = paths[p];

        for (let n = 0; n < path.length; n++) {
          const node = path[n];

                    // If first node of everything, then set origin and don't create vector (since a vector needs two nodes)
          if (c == 0 && p == 0 && n == 0) {
                        // Set Origin
            var currentNodeLocation = street.nodes[node];
            output.origin = currentNodeLocation;
          } else {
                        // Add Vector (gaps are also vectors)
            let type;
            let deltaBearing;
            var currentNodeLocation = street.nodes[node];
            const previousNodeLocation = street.nodes[previousNode];

            const bearing = getBearing(previousNodeLocation, currentNodeLocation); // in deg
            const distance = getDistance(previousNodeLocation, currentNodeLocation); // in km
            length += distance;

                        // If it is the first vector, use the globale bearing, since it compares to the y-axis
            if (c == 0 && p == 0 && n == 1) { // if second node (first vector) of everything
              deltaBearing = bearing;
            } else {
              deltaBearing = getAngleDifference(bearing, previousBearing);
            }

                        // If first node of path (n==0), then the vector ending here is translation
            if (n == 0) {
              type = 'translation';
            } else { type = 'street'; }

                        // If last node of everything, then add destination and bearing of the object
            if (p == paths.length - 1 && n == path.length - 1 && c == components.length - 1) {
              output.destination = currentNodeLocation;
              output.objectBearing = getBearing(output.origin, output.destination);
            }

                        // get bounds
            if (currentNodeLocation.lon > bounds.sw[0] || bounds.sw[0] == null) {
              bounds.sw[0] = currentNodeLocation.lon;
            }

            if (currentNodeLocation.lat > bounds.sw[1] || bounds.sw[1] == null) {
              bounds.sw[1] = currentNodeLocation.lat;
            }

            if (currentNodeLocation.lon < bounds.ne[0] || bounds.ne[0] == null) {
              bounds.ne[0] = currentNodeLocation.lon;
            }

            if (currentNodeLocation.lat < bounds.ne[1] || bounds.ne[1] == null) {
              bounds.ne[1] = currentNodeLocation.lat;
            }

                        // Prepare to output
            const vector = {
              deltaBearing: roundToDecimals(deltaBearing, 5),
              distance: roundToDecimals(distance, 8),
              type,
            };
            output.vectors.push(vector);

                        // Update previous bearing (used to calculate the bearing difference)
            previousBearing = bearing;
          }

                    // Update previous node (used to calculate the vectors)
          previousNode = node;
        }
      }
    }

    output.bounds = bounds;
    output.length = length;
    return output;
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


    // Helper script to get bearing between two points using turf
  function getBearing(from, to) {
    const fromPoint = turf.point([from.lon, from.lat]);
    const toPoint = turf.point([to.lon, to.lat]);
    return turf.bearing(fromPoint, toPoint);
  }


    // Helper script to get distance between two points using turf
  function getDistance(from, to) {
    const fromPoint = turf.point([from.lon, from.lat]);
    const toPoint = turf.point([to.lon, to.lat]);
    return turf.distance(fromPoint, toPoint);
  }


    // Helper script to get destination from a point using turf
  function getDestination(from, distance, bearing) {
    const fromPoint = turf.point([from.lon, from.lat]);
    const toPoint = turf.destination(fromPoint, distance, bearing);
    return { lon: toPoint.geometry.coordinates[0], lat: toPoint.geometry.coordinates[1] };
  }

    // Converts degrees into radians
  function toRadians(degrees) {
    return degrees * Math.PI / 180;
  }

    // Helper script to round values
  function roundToDecimals(value, numberOfDecimals) {
    const divide = Math.pow(10, numberOfDecimals);
    const roundedValue = Math.round(value * divide) / divide;
    return roundedValue;
  }

  return {
    getObjectBearing,
    rotateVectorStreet,
    getDistanceInPixels,
    getDistanceInMeters,
    getStreetWithVectors,
    subdivideVectorStreet,
    geoJsonStreetAnimation,
    getUnfoldedVectorStreet,
    getStreetWithCoordinates,
    calculateAndSetObjectBearing,
  };
};

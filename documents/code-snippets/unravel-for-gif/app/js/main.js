// Hooks to the code
function setupEventListeners() {
    $("body").on('unravelComplete', function() {
        // do something e.g. nextStreet();
    });

    $("body").on('unravelInProgress', function() {
        // take image
    });

    $("body").on('unravelStarting', function() {
        // Script will now start to unfold
    });
}

// Settings
var initialId = 16; // With which id you want to start -> normally set to 1
var selectedCity = "berlin";
var selectedType = "streets"; // Adjusts the coiling parameters
var framesPerSecond = 12; // Frames per second of the animation
var animationInterval = 100; // How long is each frame displayed -> Adjust this is slimerjs is too slow
var mapWaitLoadTime = 1000; // Since we cannot detect when the tiles in viewport are loaded, we just wait

// Main Code
var map;
var currentId;
var coilSetting;
var mongoUrl = 'mongodb://localhost:27017' + selectedCity + '_derived/';
var collection = selectedType;
var meterPerPixel = 1.2672955975;
var coilSettings = getCoilSettings();

init();

function init() {
    currentId = initialId;
    toggleButtonVisibility();
    $('#coilType').html(selectedType);
    $('#selectedCity').html(selectedCity);
    coilSetting = coilSettings[selectedType];
    setupEventListeners();
    setupMap();
}

function setupMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYm9nbmVyc3RlcGhhbiIsImEiOiJBMnlqbnZrIn0.YwiGRgpheNMPujZn-JBh6Q';
    map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
        center: [-74.50, 40], // starting position
        zoom: 9 // starting zoom
    });

    map.on('load', function() {
        addSource('street');
        loadStreetFromServer(currentId);
    });
}

function nextStreet() {
    toggleButtonVisibility();
    currentId += 1;
    toggleButtonVisibility();
    loadStreetFromServer(currentId);
}

function prevStreet() {
    if (currentId > 1) {
        currentId -= 1;
        toggleButtonVisibility();
        loadStreetFromServer(currentId);
    }
}

function jumpToStreet() {
    var val = Number($('#streetId').val());
    if (val > 1) {
        currentId = val;
        toggleButtonVisibility();
        loadStreetFromServer(currentId);
    }
}

function toggleButtonVisibility() {
    if (currentId === 1) {
        $('#prevStreetButton').css('opacity', 0.2);
    } else {
        $('#prevStreetButton').css('opacity', 1);
    }
}

function loadStreetFromServer(id) {
    $('#coilSegmentId').html(id);
    $('#coilSegmentName').html('loading ...');
    $.getJSON("data/mongoEntry.json", function(data) {
        // Set name
        var name = getNameOfCoilSegment(data)
        $('#coilSegmentName').html(name);

        // Coil
        var coil = coilSegment(data);
        var timeTransitionBounds = 1000;
        var timeUnravel = calculateBendWay(coil.from.vectors) * 200000;
        var timeTransform = getLongestTranslation(coil.from.vectors) * 200000;
        var transformDelay = 200;
        if (timeTransform < 100) {
            transformDelay = 0;
        }
        console.log(timeUnravel, timeTransform);

        // Timing
        var animationTimeInMilliSeconds = timeUnravel * 2;
        var animationTimeInSeconds = animationTimeInMilliSeconds / 1000;
        var numberOfFrames = Math.round(animationTimeInSeconds * framesPerSecond) * 2;
        $('#animationCounterTotal').html(numberOfFrames);

        var frameCounter = 0;
        var fraction = 0;
        $('#animationCounterCurrent').html(frameCounter + 1);

        var properties = {
            origin: coil.from.origin
        }

        var geoJson = unfold.geoJsonStreetAnimation(coil.to, coil.from, properties.origin, 0, 0);
        var geoJsonUnfolded = unfold.geoJsonStreetAnimation(coil.to, coil.from, properties.origin, 1, 1);
        map.getSource('street').setData(geoJson);

        var bboxFolded = turf.bbox(geoJson);
        var bboxUnfolded = turf.bbox(geoJsonUnfolded);
        var dLonWest = bboxFolded[0] - bboxUnfolded[0];
        var dLonEast = bboxFolded[2] - bboxUnfolded[2];
        var dLatNorth = bboxFolded[1] - bboxUnfolded[1];
        var dLatSouth = bboxFolded[3] - bboxUnfolded[3];

        map.fitBounds(bboxUnfolded, {
            maxZoom: 16,
            padding: 30,
            speed: 1000
        });


        setTimeout(function() {
            $("body").trigger('unravelStarting');

            function intervalTrigger() {
                return setInterval(function() {
                    frameCounter++;
                    fraction = frameCounter / numberOfFrames * 2;
                    realFraction = fraction;
                    if (realFraction > 1) {
                        realFraction = -fraction + 2;
                    };
                    var progress = easeInOutQuad(realFraction, 0, 1, 1);

                    var currentBBox = [
                        bboxFolded[0] - dLonWest * progress,
                        bboxFolded[1] - dLatNorth * progress,
                        bboxFolded[2] - dLonEast * progress,
                        bboxFolded[3] - dLatSouth * progress
                    ];
                    map.fitBounds(currentBBox, {
                        maxZoom: 16,
                        padding: 100 * progress + 30,
                        speed: 1000
                    });

                    var geoJson = unfold.geoJsonStreetAnimation(coil.to, coil.from, properties.origin, progress, progress);
                    map.getSource('street').setData(geoJson);
                    $('#animationCounterCurrent').html(frameCounter + 1);
                    if (frameCounter === numberOfFrames - 1) {
                        window.clearInterval(id);
                        $("body").trigger('unravelComplete');
                    } else {
                        $("body").trigger('unravelInProgress');
                    }
                }, animationInterval);
            }
            var id = intervalTrigger();
        });
    }, mapWaitLoadTime);
}

function animate(vectorStreet, coiledStreet, properties) {
    var timeUnravel = calculateBendWay(vectorStreet.vectors) * 200000; // This depends on how much movement is in the street geometry
    var timeTransform = getLongestTranslation(vectorStreet.vectors) * 200000; // This depends on how long the biggest translation is (when a street consists of multiple segments)
    var transformDelay = 200;
    if (timeTransform < 100) {
        transformDelay = 0;
    } // When a street consists of only piece/pieces are very close together, remove the delay

    var geoJson = unfold.geoJsonStreetAnimation(vectorStreet, coiledStreet, properties.origin, 0, 0); // Get geometry as geojson
    map.getSource('street').setData(geoJson); // Plot on map
    $({
        progressUnfold: 0
    }).delay(200).animate({
        progressUnfold: 1
    }, {
        duration: timeUnravel,
        easing: "easeOutBounce",
        progress: function(animation, progress) {
            var geoJson = unfold.geoJsonStreetAnimation(vectorStreet, coiledStreet, properties.origin, this.progressUnfold, 0);
            map.getSource('street').setData(geoJson);
        },
        complete: function(argument) {
            $({
                progressStitch: 0
            }).delay(transformDelay).animate({
                progressStitch: 1
            }, {
                duration: timeTransform,
                easing: "easeInOutBack",
                progress: function(animation, progress) {
                    var geoJson = unfold.geoJsonStreetAnimation(vectorStreet, coiledStreet, properties.origin, 1, this.progressStitch);
                    map.getSource('street').setData(geoJson);
                }
            });
        }
    });
}

function getNameOfCoilSegment(data) {
    var namingLUT = {
        "streets": "Street",
        "railtracks": "Rail",
        "railtracksparking": "Rail",
        "biketracks": "Biketrack"
    }
    var name = namingLUT[selectedType] + ' in ' + selectedCity;
    if (data.tags) {
        if (data.tags.name) {
            name = data.tags.name
        } else if (data.tags.neighborhood) {
            name = namingLUT[selectedType] + ' in ' + data.tags.neighborhood
        }
    }
    return name;
}

function coilSegment(data) {
    var vectorStreet = unfold.getStreetWithVectors(data);
    console.log(vectorStreet);
    var vectorStreetDivided = unfold.subdivideVectorStreet(vectorStreet, 1);

    coil.setProperties(999, 5)
    var properties = coil.getPropertiesToSquareCoil(vectorStreetDivided.length * 1000, 5);
    console.log(properties);
    coil.setProperties(properties.width, 5)
    var coiledStreet = coil.getCoiledStreet(vectorStreetDivided, 0, coilSetting.damping, 5);
    return {
        "from": coiledStreet,
        "to": vectorStreetDivided
    }
}

function addSource(name) {
    map.addSource(name, {
        "type": "geojson",
        "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [-122.48369693756104, 37.83381888486939],
                    [-122.48348236083984, 37.83317489144141]
                ]
            }
        }
    });
    map.addLayer({
        "id": name,
        "type": "line",
        "source": name,
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#000",
            "line-width": 5
        }
    });
}

function getCoilSettings() {
    coilSettings = {};
    coilSettings.streets = {
        "widthInMeter": 722.358490575,
        "parkingArea": 8156098.06,
        "parkingSvgHeight": 20584,
        "widthInPixels": 570,
        "gap": 0.015,
        "limit": null,
        "damping": 500,
        "onStreetParkingSpots": 0,
        "strokeColor": "#6566CC",
        "strokeWidth": 10
    };
    coilSettings.railtracks = {
        "widthInMeter": 722.358490575,
        "parkingArea": 8156098.06,
        "parkingSvgHeight": 20584,
        "widthInPixels": 570,
        "gap": 0.008,
        "limit": null,
        "damping": 400,
        "onStreetParkingSpots": 0,
        "strokeColor": "#6566CC",
        "strokeWidth": 5
    }
    coilSettings.biketracks = {
        "widthInMeter": 722.358490575,
        "parkingArea": 8156098.06,
        "parkingSvgHeight": 20584,
        "widthInPixels": 570,
        "gap": 0.01,
        "limit": null,
        "damping": 600,
        "onStreetParkingSpots": 0,
        "strokeColor": "#6566CC",
        "strokeWidth": 5
    }
    coilSettings.railtracksparking = {
        "widthInMeter": 722.358490575,
        "parkingArea": 8156098.06,
        "parkingSvgHeight": 20584,
        "widthInPixels": 570,
        "gap": 0.008,
        "limit": null,
        "damping": 400,
        "onStreetParkingSpots": 0,
        "strokeColor": "#6566CC",
        "strokeWidth": 5
    }
    return coilSettings;
}

function easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

$.easing.easeOutBounce = function(x, t, b, c, d) {
    if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
    } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
    } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
    } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
    }
}
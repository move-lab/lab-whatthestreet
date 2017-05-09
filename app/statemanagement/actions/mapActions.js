import { MAP } from '../constants';

export const loadMap = () => ({ type: MAP.LOAD_REQUEST });
export const loadSuccess = () => ({ type: MAP.LOAD_SUCCESS });
export const loadFailure = () => ({ type: MAP.LOAD_FAILURE });


export const setLatitude = (latitude) => ({ type: MAP.SET_LATITUDE, latitude });
export const setLongitude = (longitude) => ({ type: MAP.SET_LONGITUDE, longitude });
export const setNeighborhood = (neighborhood) => ({ type: MAP.SET_NEIGHBORHOOD, neighborhood });
export const setZoom = (zoom) => ({ type: MAP.SET_ZOOM, zoom });
export const setArea = (area) => ({ type: MAP.SET_AREA, area });
export const setRotation = (rotation) => ({ type: MAP.SET_ROTATION, rotation });
export const setCenter = (center) => ({ type: MAP.SET_CENTER, center });

export const setPoligonCoordinates = (coordinates) => ({ type: MAP.SET_POLYGON_COORDINATES, coordinates });
export const setMapMode = (modeIdentifier) => ({ type: MAP.SET_MAP_MODE, mode: modeIdentifier });

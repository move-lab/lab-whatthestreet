import { fromJS } from 'immutable';

import { MAP } from 'data/constants';

const initialState = fromJS({
  latitude: 48.7666667,
  longitude: 9.1833333,
  neighborhood: 'Stuttgart',
  zoom: 15,
  area: 0,
  coordinates: fromJS([[]]),
  rotation: 0,
  center: [],
  mapMode: 'parking',
  error: false,
  loading: false,
});

export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case MAP.LOAD_REQUEST:
      return state
      .set('loading', true);
    case MAP.LOAD_SUCCESS:
      return state
      .set('loading', false);
    case MAP.LOAD_FAILURE:
      return state
      .set('loading', false)
      .set('error', true);
    case MAP.SET_LATITUDE:
      return state
      .set('latitude', action.latitude);
    case MAP.SET_LONGITUDE:
      return state
      .set('longitude', action.longitude);
    case MAP.SET_NEIGHBORHOOD:
      return state
      .set('neighborhood', action.neighborhood);
    case MAP.SET_ZOOM:
      return state
      .set('zoom', action.zoom);
    case MAP.SET_AREA:
      return state
      .set('area', action.area);
    case MAP.SET_POLYGON_COORDINATES:
      return state
      .set('coordinates', fromJS(action.coordinates));
    case MAP.SET_ROTATION:
      return state
      .set('rotation', action.rotation);
    case MAP.SET_CENTER:
      return state
      .set('center', fromJS(action.center));
    case MAP.SET_MAP_MODE:
      return state
      .set('mapMode', fromJS(action.mode));
    default:
      return state;
  }
}

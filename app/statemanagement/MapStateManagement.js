import { fromJS } from 'immutable';
import axios from 'axios';

// Initial state
const initialState = fromJS({
  areaType: null,
  itemId: null,
  isFetchingLaneData: false,
  laneData: null,
  parkingData: null,
  errorFetchingLaneData: false
});

// Actions
export const SET_AREA_TYPE = 'Map/SET_AREA_TYPE';
export const SET_ITEM_ID = 'Map/SET_ITEM_ID';
export const SET_PARKING_DATA = 'Map/SET_PARKING_DATA';

export const START_FETCHING_LANE_DATA = 'Map/START_FETCHING_LANE_DATA';
export const SUCCESS_FETCHING_LANE_DATA = 'Map/SUCCESS_FETCHING_LANE_DATA';
export const ERROR_FETCHING_LANE_DATA = 'Map/ERROR_FETCHING_LANE_DATA';

export function setAreaType(areaType) {
  return {
    type: SET_AREA_TYPE,
    payload: areaType
  }
}

export function setItemId(itemId) {
  return {
    type: SET_ITEM_ID,
    payload: itemId
  }
}

export function startFetchingLaneData() {
  return {
    type: START_FETCHING_LANE_DATA
  }
}

export function errorFetchingLaneData(error) {
  return {
    type: ERROR_FETCHING_LANE_DATA,
    payload: error
  }
}

export function successFetchingLaneData(laneData) {
  return {
    type: SUCCESS_FETCHING_LANE_DATA,
    payload: laneData
  }
}


export function setParkingData(data) {
  return (dispatch) => {
    dispatch({
      type: SET_PARKING_DATA,
      payload: data
    });
    dispatch(setItemId(data.id))
    dispatch(setAreaType('parking'));
  }
}

export function fetchLaneData(itemId, areaType, railParking) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {

      // If areaType === parking, can't get the data from the API
      // There is an HACK that set the data previously from the ExplorePage
      // The SVG dom has the info
      if(areaType === 'parking' && !railParking) {
        return;
      }

      // Notify UI we are fetching stuff
      dispatch(startFetchingLaneData());
      dispatch(setAreaType(areaType));
      dispatch(setItemId(itemId));

      const baseUrl = getState().app.get('baseUrl');

      const currentCity = getState().city.getIn(['actual_city','slug']);
      let activeVehicule = getState().vehicles.get('vehicle');
      if(railParking) {
        activeVehicule = 'railparking';
      }

      axios.get(`${baseUrl}/api/v1/cities/${currentCity}/streets/${activeVehicule}/${itemId}`).then((response) => {
        dispatch(successFetchingLaneData(response.data));
        resolve();
      }, (error) => {
        dispatch(errorFetchingLaneData(error));
        reject();
      });
      
    });
  };
}

// Reducer
export default function MapStateManagement(state = initialState, action) {
  switch (action.type) {
    case SET_AREA_TYPE:
      return state
        .set('areaType', action.payload);
    case SET_ITEM_ID:
      return state
        .set('itemId', action.payload);
    case START_FETCHING_LANE_DATA:
      return state
        .set('isFetchingLaneData', true)
        .set('errorFetchingLaneData', false)
        .set('laneData', null)
    case ERROR_FETCHING_LANE_DATA:
      return state
        .set('isFetchingLaneData', false)
        .set('errorFetchingLaneData', true)
    case SUCCESS_FETCHING_LANE_DATA:
      return state
        .set('isFetchingLaneData', false)
        .set('laneData', fromJS(action.payload))
     case SET_PARKING_DATA:
      return state
        .set('parkingData', fromJS(action.payload))
    default:
      return state;
  }
}

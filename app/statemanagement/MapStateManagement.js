import { fromJS } from 'immutable';
import axios from 'axios';

// Initial state
const initialState = fromJS({
  areaType: null,
  itemId: null,
  isFetchingItemData: false,
  itemData: null,
  parkingData: null,
  errorFetchingItemData: false
});

// Actions
export const SET_AREA_TYPE = 'Map/SET_AREA_TYPE';
export const SET_ITEM_ID = 'Map/SET_ITEM_ID';
export const SET_PARKING_DATA = 'Map/SET_PARKING_DATA';

export const START_FETCHING_ITEM_DATA = 'Map/START_FETCHING_ITEM_DATA';
export const SUCCESS_FETCHING_ITEM_DATA = 'Map/SUCCESS_FETCHING_ITEM_DATA';
export const ERROR_FETCHING_ITEM_DATA = 'Map/ERROR_FETCHING_ITEM_DATA';

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

export function startFetchingItemData() {
  return {
    type: START_FETCHING_ITEM_DATA
  }
}

export function errorFetchingItemData(error) {
  return {
    type: ERROR_FETCHING_ITEM_DATA,
    payload: error
  }
}

export function successFetchingItemData(itemData) {
  return {
    type: SUCCESS_FETCHING_ITEM_DATA,
    payload: itemData
  }
}


export function setParkingData(data) {
  return (dispatch) => {
    dispatch(setAreaType('parking'));
    dispatch(setItemId(data.id))
    dispatch({
      type: SET_PARKING_DATA,
      payload: data
    });
  }
}

export function fetchItemData(itemId, areaType) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {

      // If areaType === parking, can't get the data from the API
      // There is an HACK that set the data previously from the ExplorePage
      // The SVG dom has the info
      if(areaType === 'parking') {
        return;
      }

      // Notify UI we are fetching stuff
      dispatch(startFetchingItemData());
      dispatch(setAreaType(areaType));
      dispatch(setItemId(itemId));

      console.log(`Fetching itemId: ${itemId} , areaType: ${areaType}`);

      const baseUrl = getState().app.get('baseUrl');

      const currentCity = getState().city.getIn(['actual_city','slug']);
      const activeVehicule = getState().vehicles.get('vehicle');

      axios.get(`${baseUrl}/api/v1/cities/${currentCity}/streets/${activeVehicule}/${itemId}`).then((response) => {
        dispatch(successFetchingItemData(response.data));
        resolve();
      }, (error) => {
        dispatch(errorFetchingItemData(error));
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
    case START_FETCHING_ITEM_DATA:
      return state
        .set('isFetchingItemData', true)
        .set('errorFetchingItemData', false)
        .set('itemData', null)
    case ERROR_FETCHING_ITEM_DATA:
      return state
        .set('isFetchingItemData', false)
        .set('errorFetchingItemData', true)
    case SUCCESS_FETCHING_ITEM_DATA:
      return state
        .set('isFetchingItemData', false)
        .set('itemData', fromJS(action.payload))
     case SET_PARKING_DATA:
      return state
        .set('parkingData', fromJS(action.payload))
    default:
      return state;
  }
}

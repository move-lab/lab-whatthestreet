import { CITY_META } from '../constants';
import axios from 'axios';

export function startLoadCityMetaData() {
  return {
    type: CITY_META.LOAD_REQUEST,
  };
}

export function loadCityMetaDataSuccess(data) {
  return {
    type: CITY_META.LOAD_SUCCESS,
    data,
  };
}

export function loadCityMetaDataFailure(err) {
  return {
    type: CITY_META.LOAD_FAILURE,
    error: err,
  };
}

export function loadCityMetadata(citySlug) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const baseUrl = getState().app.get('baseUrl');
      dispatch(startLoadCityMetaData());
      axios.get(`${baseUrl}/api/v1/cities/${citySlug}`).then((response) => {
        dispatch(loadCityMetaDataSuccess(response.data));
        resolve();
      }, (error) => {
        dispatch(loadCityMetaDataFailure(error))
        reject(error);
      });
    });
  }
}

import { fromJS } from 'immutable';
import axios from 'axios';
import { CITY } from '../constants';

export function startLoadingCities() {
  return {
    type: CITY.LOAD_CITIES_REQUEST,
  };
}

export function onLoadCitiesSuccess(data) {
  return {
    type: CITY.LOAD_CITIES_SUCCESS,
    payload: fromJS(data),
  };
}

export function onLoadCitiesFailure(err) {
  return {
    type: CITY.LOAD_CITIES_FAILURE,
    error: err,
  };
}

export function selectCity(index) {
  return {
    type: CITY.SELECT_CITY,
    payload: index
  };
}

export function toggleCitySelection() {
  return {
    type: CITY.TOGGLE_CITY_SELECTION,
  };
}

export function setNearestCity(city) {
  return {
    type: CITY.SET_NEAREST_CITY,
    city,
  };
}

export function getCitiesbyIp() {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/api/v1/cities/nearest').then((response) => {
        dispatch(setNearestCity(response.data));
        resolve();
      }, (error) => {
        reject(error);
      });
    });
  }
}

export function loadCities() {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(startLoadingCities());

      axios.get('http://localhost:3000/api/v1/cities').then((response) => {
        dispatch(onLoadCitiesSuccess(response.data));
        dispatch(selectCity(0));
        resolve();
        // dispatch(getCitiesbyIp()).then(() => {
        //   resolve();
        // }, (error) => {
        //   reject(error);
        // });
      }, (error) => {
        dispatch(onLoadCitiesFailure(error));
        reject(error);
      });
    })
  };
}

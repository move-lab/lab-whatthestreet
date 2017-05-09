import { fromJS } from 'immutable';
import { CITY } from '../constants';

export function loadCities() {
  return {
    type: CITY.LOAD_CITIES_REQUEST,
  };
}

export function onLoadCitiesSuccess(data) {
  return {
    type: CITY.LOAD_CITIES_SUCCESS,
    cities: fromJS(data),
  };
}

export function onLoadCitiesFailure(err) {
  return {
    type: CITY.LOAD_CITIES_FAILURE,
    error: err,
  };
}

export function selectCity(identifyer) {
  return {
    type: CITY.SELECT_CITY,
    city: identifyer,
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

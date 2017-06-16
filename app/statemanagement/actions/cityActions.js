import { fromJS } from 'immutable';
import axios from 'axios';
import { CITY } from '../constants';
import * as CityMetaActions from './cityMetaActions';
import * as VersusActions from './versusActions';
import * as GuessActions from './guessActions';

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

export function prefetchCitySvg(citySlug) {
  return (dispatch, getState) => {
    const baseUrl = getState().app.get('baseUrl');
    axios.get(`${baseUrl}/static/cities/${citySlug}/lanes/car.svg`);
    axios.get(`${baseUrl}/static/cities/${citySlug}/parking/car.svg`);
  }
}

export function selectCity(citySlug, prefetchSvg) {
  return (dispatch, getState) => {

    // Select city
    dispatch({
      type: CITY.SELECT_CITY,
      payload: citySlug
    });

    // Load City Metadata
    const fetchCityMetaData = dispatch(CityMetaActions.loadCityMetadata(citySlug));

    // Load Versus Data
    const fetchVersusData = dispatch(VersusActions.loadVersusData(citySlug));

    // Load Guesses
    const guessData = dispatch(GuessActions.loadGuesses(citySlug));

    // Prefetch svgs for car
    if(prefetchSvg) {
      dispatch(prefetchCitySvg(citySlug));
    }

    return Promise.all([fetchCityMetaData, fetchVersusData, guessData]);
  }
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
      const baseUrl = getState().app.get('baseUrl');
      axios.get(`${baseUrl}/api/v1/cities/nearest`).then((response) => {
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
      const baseUrl = getState().app.get('baseUrl');
      axios.get(`${baseUrl}/api/v1/cities`).then((response) => {
        dispatch(onLoadCitiesSuccess(response.data));
        resolve();
      }, (error) => {
        dispatch(onLoadCitiesFailure(error));
        reject(error);
      });
    })
  };
}

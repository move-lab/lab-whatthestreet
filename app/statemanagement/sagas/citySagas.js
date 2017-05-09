import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { CityActions } from '../actions';
import { CITY } from '../constants';

/**
 * Cities Handler
 */
export function* getCities() {
  const requestURL = '/api/v1/cities';

  try {
    const cities = yield call(axios.get, requestURL);
    yield put(CityActions.onLoadCitiesSuccess(cities));
    yield put(CityActions.selectCity(0));
  } catch (error) {
    yield put(CityActions.onLoadCitiesFailure(error));
  }
}

/**
 * Cities Handler by IP-Address
 */
export function* getCitiesbyIp() {
  const requestURL = '/api/v1/cities/nearest';

  try {
    const city = yield call(axios.get, requestURL);
    yield put(CityActions.setNearestCity(city));
  } catch (error) {
    // Do nothing
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* cityData() {
  const watcher = yield takeLatest(CITY.LOAD_CITIES_REQUEST, getCities);
  const ipWatcher = yield takeLatest(CITY.LOAD_CITIES_SUCCESS, getCitiesbyIp);
  yield put(CityActions.loadCities());

  // Suspend execution until location changes
  // yield take(LOCATION_CHANGE);
  // yield cancel(watcher);
  // yield cancel(ipWatcher);
}

// Bootstrap sagas
export default [
  cityData,
];

import { select, take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { CityMetaActions } from '../actions';
import { CitySelectors } from '../selectors';
import { CITY } from '../constants';

/**
 * CityMetaData handler
 */
export function* getCityMetaData() {
  const currentCity = yield select(CitySelectors.makeSelectActualCity());

  const requestURL = `/api/v1/cities/${currentCity.slug}`;

  try {
    const data = yield call(axios.get, requestURL);
    yield put(CityMetaActions.loadCityMetaDataSuccess(data));
  } catch (error) {
    yield put(CityMetaActions.loadCityMetaDataFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* cityMetaData() {
  const watcher = yield takeLatest(CITY.SELECT_CITY, getCityMetaData);

  // Suspend execution until location changes
  // yield take(LOCATION_CHANGE);
  // yield cancel(watcher);
}

// Bootstrap sagas
export default [
  cityMetaData,
];

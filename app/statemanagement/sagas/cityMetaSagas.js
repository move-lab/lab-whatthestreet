/**
 * CityMetaSagas
 */

// Libraries
import { select, take, call, put, cancel, takeLatest } from 'redux-saga/effects';

// Actions
import { CityMetaActions } from 'data/actions';

// Selectors
import { CitySelectors } from 'data/selectors';

// Constants
import { LOCATION_CHANGE } from 'react-router-redux';
import { CITY } from 'data/constants';

// Utils
import request from 'utils/request';


/**
 * CityMetaData handler
 */
export function* getCityMetaData() {
  const currentCity = yield select(CitySelectors.makeSelectActualCity());

  const requestURL = `/api/v1/cities/${currentCity.slug}`;

  try {
    const data = yield call(request, requestURL);
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
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  cityMetaData,
];

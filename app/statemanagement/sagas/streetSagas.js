/**
 * CityMetaSagas
 */

// Libraries
import { select, take, call, put, cancel, takeLatest } from 'redux-saga/effects';

// Actions
import { StreetActions } from 'data/actions';

// Selectors
import { CitySelectors, StreetSelectors, makeSelectActualVehicle } from 'data/selectors';

// Constants
import { LOCATION_CHANGE } from 'react-router-redux';
import { STREET } from 'data/constants';

// Utils
import request from 'utils/request';


/**
 * get street by id handler
 */
export function* getStreetById() {
  const city = yield select(CitySelectors.makeSelectActualCity());
  const vehicle = yield select(makeSelectActualVehicle());
  const streetId = yield select(StreetSelectors.selectStreetId());

  const requestURL = `/api/v1/cities/${city.slug}/streets/${vehicle}/${streetId}`;

  try {
    const data = yield call(request, requestURL);
    yield put(StreetActions.loadStreetSuccess(data));
  } catch (error) {
    yield put(StreetActions.loadStreetFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* streetData() {
  const watcher = yield takeLatest(STREET.LOAD_STREET_REQUEST, getStreetById);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  streetData,
];

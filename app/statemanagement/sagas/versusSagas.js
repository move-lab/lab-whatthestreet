/**
 * CityMetaSagas
 */

// Libraries
import { select, take, call, put, cancel, takeLatest } from 'redux-saga/effects';

// Actions
import { VersusActions } from 'data/actions';

// Selectors
import { CitySelectors } from 'data/selectors';

// Constants
import { LOCATION_CHANGE } from 'react-router-redux';
import { CITY } from 'data/constants';

// Utils
import request from 'utils/request';


/**
 * versusData handler
 */
export function* getVersusData() {
  const currentCity = yield select(CitySelectors.makeSelectActualCity());

  const requestURL = `/api/v1/cities/${currentCity.slug}/versus`;

  try {
    const data = yield call(request, requestURL);
    yield put(VersusActions.loadVersusDataSuccess(data));
  } catch (error) {
    yield put(VersusActions.loadVersusDataFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* versusData() {
  const watcher = yield takeLatest(CITY.SELECT_CITY, getVersusData);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  versusData,
];

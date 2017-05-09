/**
 * CityMetaSagas
 */

// Libraries
import { select, take, call, put, cancel, takeLatest } from 'redux-saga/effects';

// Actions
import { SearchActions } from 'data/actions';

// Selectors
import { CitySelectors, SearchSelectors } from 'data/selectors';

// Configuration
import { API_BASE } from 'environment';

// Constants
import { LOCATION_CHANGE } from 'react-router-redux';
import { SEARCH } from 'data/constants';

// Utils
import request from 'utils/request';


/**
 * get street by id handler
 */
export function* getSearchResults() {
  const city = yield select(CitySelectors.makeSelectActualCity());
  const term = yield select(SearchSelectors.selectTerm());

  const requestURL = `${API_BASE}cities/${city.slug}/search_street/${term}`;

  try {
    const data = yield call(request, requestURL);
    yield put(SearchActions.loadResultsSuccess(data));
  } catch (error) {
    yield put(SearchActions.loadResultsFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* searchData() {
  const watcher = yield takeLatest(SEARCH.LOAD_RESULTS_REQUEST, getSearchResults);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  searchData,
];

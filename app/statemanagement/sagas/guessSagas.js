// Lib
import { select, take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Actions
import { GuessActions } from 'data/actions';

// Constants
import { LOCATION_CHANGE } from 'react-router-redux';
import { CITY, CITY_META, GUESS } from 'data/constants';

// Selectors
import { CitySelectors, CityMetaSelectors, GuessSelectors } from 'data/selectors';

// Utils
import request from 'utils/request';


/**
 * Guesses Handler
 */
export function* getGuesses() {
  const currentCity = yield select(CitySelectors.makeSelectActualCity());

  const requestURL = `/api/v1/cities/${currentCity.slug}/guess`;

  try {
    const guesses = yield call(request, requestURL);
    yield put(GuessActions.onLoadGuessesSuccess(guesses));
  } catch (error) {
    yield put(GuessActions.onLoadGuessesFailure(error));
  }
}

/**
 * Actual Handler
 */
export function* getActualGuesses() {
  const city = yield select(CityMetaSelectors.makeSelectCityMetaData());
  try {
    yield put(GuessActions.setActual(city.space));
  } catch (error) {
    yield put(GuessActions.onLoadGuessesFailure(error));
  }
}

/**
 * Guesses Saver
 */
export function* saveGuess() {
  const currentCity = yield select(CitySelectors.makeSelectActualCity());
  const ownGuess = yield select(GuessSelectors.makeSelectOwnGuess());

  const requestURL = `/api/v1/cities/${currentCity.slug}/guess`;

  try {
    yield axios.post(requestURL, {
      guess: ownGuess,
    });
  } catch (error) {
    yield put(GuessActions.onLoadGuessesFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* guessData() {
  const watcher = yield takeLatest(CITY.SELECT_CITY, getGuesses);
  const actualWatcher = yield takeLatest(CITY_META.LOAD_SUCCESS, getActualGuesses);
  const saveWatcher = yield takeLatest(GUESS.SAVE_GUESS, saveGuess);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  yield cancel(actualWatcher);
  yield cancel(saveWatcher);
}

// Bootstrap sagas
export default [
  guessData,
];

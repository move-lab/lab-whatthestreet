import { fromJS } from 'immutable';
import { GUESS } from '../constants';
import axios from 'axios';

export function startLoadGuesses() {
  return {
    type: GUESS.LOAD_GUESSES_REQUEST,
  };
}

export function onLoadGuessesSuccess(data) {
  return {
    type: GUESS.LOAD_GUESSES_SUCCESS,
    guesses: fromJS(data),
  };
}

export function onLoadGuessesFailure(err) {
  return {
    type: GUESS.LOAD_GUESSES_FAILURE,
    error: err,
  };
}

export function loadGuesses(citySlug) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const baseUrl = getState().app.get('baseUrl');
      dispatch(startLoadGuesses());

      axios.get(`${baseUrl}/api/v1/cities/${citySlug}/guess`).then((response) => {
        dispatch(onLoadGuessesSuccess(response.data));
        resolve();
      }, (error) => {
        dispatch(onLoadGuessesFailure(error))
        reject(error);
      });
    });
  }
}

export function setOwnGuess(guess) {
  return {
    type: GUESS.SET_OWN_GUESS,
    guess,
  };
}

export function setActual(data) {
  const hundredPercent = data.rail + data.car + data.bike;
  const car = ((100 / hundredPercent) * data.car) / 100;
  const bike = ((100 / hundredPercent) * data.bike) / 100;
  const rail = ((100 / hundredPercent) * data.rail) / 100;

  const result = { car, bike, rail };

  return {
    type: GUESS.SET_ACTUAL,
    data: result,
  };
}


export function startSavingGuess(data) {
  return {
    type: GUESS.SAVE_GUESS
  };
}

export function saveGuess(guess, citySlug) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const baseUrl = getState().app.get('baseUrl');
      const citySlug = getState().city.getIn(['actual_city', 'slug']);
      dispatch(startSavingGuess());
      axios.post(`${baseUrl}/api/v1/cities/${citySlug}/guess`, {
        guess: guess,
      }).then((response) => {
        console.log('Success saving guess');
        resolve();
      }, (error) => {
        console.log('Error while saving guess');
        reject(error);
      });
    });
  }
}

import { fromJS } from 'immutable';
import { GUESS } from '../constants';

export function loadGuesses() {
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


export function saveGuess(data) {
  return {
    type: GUESS.SAVE_GUESS,
    data,
  };
}

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
      const authHeader = getState().app.get('authHeader');
      dispatch(startLoadGuesses());

      axios.get(`${baseUrl}/api/v1/cities/${citySlug}/guess`,{
        headers: {
           "Authorization" : authHeader
        }
      }).then((response) => {
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
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: GUESS.SET_OWN_GUESS,
        guess,
      });

      dispatch({
        type: GUESS.GET_SUGGESTION_START
      });

      const baseUrl = getState().app.get('baseUrl');
      const authHeader = getState().app.get('authHeader');
      axios.post(`${baseUrl}/api/v1/closestCityToGuess`, {
        guess: guess
      },{
        headers: {
           "Authorization" : authHeader
        }
      }).then((results) => {
        dispatch({
          type: GUESS.GET_SUGGESTION_SUCCESS,
          payload: results.data,
        });
        resolve();
      }, (error) => {
        dispatch({
          type: GUESS.GET_SUGGESTION_ERROR
        });
        reject();
      });
    });
  }
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
      const authHeader = getState().app.get('authHeader');
      dispatch(startSavingGuess());
      axios.post(`${baseUrl}/api/v1/cities/${citySlug}/guess`, {
        guess: guess,
      },{
        headers: {
           "Authorization" : authHeader
        }
      }).then((response) => {
        resolve();
      }, (error) => {
        reject(error);
      });
    });
  }
}

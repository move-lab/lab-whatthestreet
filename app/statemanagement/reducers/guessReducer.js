import { fromJS } from 'immutable';

import { GUESS } from '../constants';

const initialState = fromJS({
  loading: false,
  error: false,
  others: fromJS([{ car: 0.9, bike: 0.05, rail: 0.05 }, { car: 0.8, bike: 0.1, rail: 0.1 }, { car: 0.85, bike: 0.125, rail: 0.125 }, { car: 0.9, bike: 0.05, rail: 0.05 }]),
  own: fromJS({ car: 0.333, rail: 0.333, bike: 0.333 }),
  actual: fromJS({ rail: 0.5, car: 0.3, bike: 0.2 }),
});

export default function guessReducer(state = initialState, action) {
  switch (action.type) {
    case GUESS.LOAD_GUESSES_REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
        .set('others', fromJS([]));
    case GUESS.LOAD_GUESSES_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('others', fromJS(action.guesses));
    case GUESS.LOAD_GUESSES_FAILURE:
      return state
        .set('loading', false)
        .set('error', true);
    case GUESS.SET_OWN_GUESS:
      return state
      .set('own', fromJS(action.guess));
    case GUESS.SET_ACTUAL:
      return state
      .set('actual', fromJS(action.data));
    default:
      return state;
  }
}

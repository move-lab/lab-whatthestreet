import { fromJS } from 'immutable';

import { GUESS } from '../constants';

const initialState = fromJS({
  loading: false,
  error: false,
  others: fromJS([]),
  own: fromJS({ car: 0.33, rail: 0.33, bike: 0.33 }),
  actual: fromJS({}),
  suggestion: fromJS({})
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
    case GUESS.GET_SUGGESTION_SUCCESS:
      return state
      .set('suggestion', fromJS(action.payload));
    default:
      return state;
  }
}

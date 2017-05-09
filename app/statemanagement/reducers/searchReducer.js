import { fromJS } from 'immutable';

/**
 * LOAD_RESULTS_REQUEST
 * LOAD_RESULTS_SUCCESS
 * LOAD_RESULTS_FAILURE
 * SELECT_RESULT
 * TOGGLE_SEARCH
 */

import { SEARCH } from 'data/constants';

const initialState = fromJS({
  results: fromJS([]),
  error: null,
  errorMessage: '',
  selectedResult: fromJS({}),
  term: '',
  items: fromJS([]),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH.LOAD_RESULTS_REQUEST:
      return state
        .set('loading', true)
        .set('error', null);
    case SEARCH.LOAD_RESULTS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', null)
        .set('results', fromJS(action.results));
    case SEARCH.LOAD_RESULTS_FAILURE:
      return state
        .set('error', true)
        .set('errorMessage', action.message)
        .set('loading', false);
    case SEARCH.SELECT_RESULT:
      return state.set('selectedResult', fromJS(action.result));
    case SEARCH.CHANGE_TERM:
      return state.set('term', action.term);
    case SEARCH.ADD_TO_SEARCHBASE:
      return state.set('items', fromJS(action.items));
    default:
      return state;
  }
}

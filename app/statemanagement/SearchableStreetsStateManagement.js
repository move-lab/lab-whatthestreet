import { fromJS } from 'immutable';
import { createSearchAction } from 'redux-search';

// Initial state
const initialState = fromJS({
  carStreets: {},
  selectedResult: null
});

// Actions
const SET_DATA = 'SearchableStreet/SET_DATA';
const SELECT_RESULT = 'SearchableStreet/SELECT_RESULT';
const RESET_SELECT_RESULT = 'SearchableStreet/RESET_SELECT_RESULT';

export function setData(data) {
  return {
    type: SET_DATA,
    payload: data
  }
}

export function selectResult(id) {
  return {
    type: SELECT_RESULT,
    payload: id
  }
}

export function resetSelectedResult() {
  return {
    type: RESET_SELECT_RESULT
  }
}

export const search = createSearchAction('carStreets');

// Reducer
export default function SearchableStreetsStateManagement(state = initialState, action = {}) {
  switch (action.type) {
    case SET_DATA:
      return state.set('carStreets', action.payload);
    case SELECT_RESULT:
      return state.set('selectedResult', action.payload);
    case RESET_SELECT_RESULT:
      return state.set('selectedResult', null);
    default:
      return state;
  }
}

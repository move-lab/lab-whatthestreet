import { fromJS } from 'immutable';
import { createSearchAction } from 'redux-search';

// Initial state
const initialState = fromJS({
  carStreets: {}
});

// Actions
const SET_DATA = 'App/SET_DATA';

export function setData(data) {
  return {
    type: SET_DATA,
    payload: data
  }
}

export const search = createSearchAction('carStreets');

// Reducer
export default function SearchableStreetsStateManagement(state = initialState, action = {}) {
  switch (action.type) {
    case SET_DATA:
      return state.set('carStreets', action.payload);
    default:
      return state;
  }
}

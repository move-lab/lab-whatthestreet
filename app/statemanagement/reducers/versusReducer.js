import { fromJS } from 'immutable';

import { VERSUS } from '../constants';

const initialState = fromJS({
  loading: false,
  error: false,
  data: [],
});

export default function versusReducer(state = initialState, action) {
  switch (action.type) {
    case VERSUS.LOAD_REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', fromJS([]));
    case VERSUS.LOAD_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('data', fromJS(action.data));
    case VERSUS.LOAD_FAILURE:
      return state
        .set('loading', false)
        .set('error', true);
    default:
      return state;
  }
}

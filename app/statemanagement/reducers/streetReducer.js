import { fromJS } from 'immutable';

import { STREET } from '../constants';

const initialState = fromJS({
  loading: false,
  error: null,
  errorMessage: '',
  id: 1,
  data: fromJS({}),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case STREET.LOAD_STREET_REQUEST:
      return state
        .set('loading', true)
        .set('error', null);
    case STREET.SET_STREET_ID:
      return state
        .set('loading', true)
        .set('error', null)
        .set('id', action.id);
    case STREET.LOAD_STREET_ERROR:
      return state
        .set('error', true)
        .set('errorMessage', action.message)
        .set('loading', false);
    case STREET.LOAD_STREET_SUCCESS:
      return state
        .set('loading', false)
        .set('error', null)
        .set('data', fromJS(action.data));
    default:
      return state;
  }
}

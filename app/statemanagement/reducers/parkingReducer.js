import { fromJS } from 'immutable';

import { SET_PARKINGSPACE, CLEAR_PARKINGSPACE } from '../constants';

const initialState = fromJS({
  id: 0,
  neighborhood: '',
  area: 0,
});

export default function parkingReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PARKINGSPACE:
      return state.merge(action.payload);
    case CLEAR_PARKINGSPACE:
      return initialState;
    default:
      return state;
  }
}

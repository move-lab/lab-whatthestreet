import { fromJS } from 'immutable';

import { SET_PARKINGSPACE } from 'data/constants';

const initialState = fromJS({
  id: 0,
  neighborhood: '',
  area: 0,
});

export default function parkingReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PARKINGSPACE:
      return state
      .set('neighborhood', action.neighborhood)
      .set('id', action.id)
      .set('area', action.area);
    default:
      return state;
  }
}
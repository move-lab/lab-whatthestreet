import { fromJS } from 'immutable';

import { LANES } from '../constants';

const initialState = fromJS({
  neighborhood: '',
  name: '',
  length: 0,
  area: 0,
  cumulativeArea: 0,
});

export default function laneReducer(state = initialState, action) {
  switch (action.type) {
    case LANES.SET_LANE:
      return state
      .set('neighborhood', action.neighborhood)
      .set('name', action.name)
      .set('length', action.length)
      .set('area', action.area)
      .set('cumulativeArea', action.cumulativeArea);
    case LANES.CLEAR_LANE:
      return initialState;
    default:
      return state;
  }
}

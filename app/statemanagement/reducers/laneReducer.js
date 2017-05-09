import { fromJS } from 'immutable';

import { LANES } from 'data/constants';

const initialState = fromJS({
  neighborhood: '',
  name: '',
  length: 0,
  area: 0,
  coordinates: {},
});

export default function laneReducer(state = initialState, action) {
  switch (action.type) {
    case LANES.SET_LANE:
      return state
      .set('neighborhood', action.neighborhood)
      .set('name', action.name)
      .set('length', action.length)
      .set('area', action.area)
      .set('coordinates', action.coordinates);
    default:
      return state;
  }
}

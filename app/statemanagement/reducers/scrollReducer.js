import { fromJS } from 'immutable';

import {
  NEXT_SCROLL_INDEX,
  PREVIOUS_SCROLL_INDEX,
  SET_SCROLL_INDEX,
  REGISTER_SCROLL_TARGET,
  FINISH_SCROLLING,
} from 'data/constants';

const initialState = fromJS({
  scrollIndex: 0,
  scrolling: false,
  scrollTargets: [],
});

function scrollReducer(state = initialState, action) {
  switch (action.type) {
    case NEXT_SCROLL_INDEX:
      return state
        .set('scrollIndex', state.toJS().scrollIndex + 1)
        .set('scrolling', true);
    case PREVIOUS_SCROLL_INDEX:
      return state
        .set('scrollIndex', state.toJS().scrollIndex - 1)
        .set('scrolling', true);
    case SET_SCROLL_INDEX:
      return state
        .set('scrollIndex', action.scrollIndex)
        .set('scrolling', true);
    case REGISTER_SCROLL_TARGET:
      return state
        .set('scrollTargets', fromJS(state.toJS().scrollTargets.concat(action.target)));
    case FINISH_SCROLLING:
      return state
        .set('scrolling', false);
    default:
      return state;
  }
}

export default scrollReducer;

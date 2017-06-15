import { fromJS } from 'immutable';
import debounce from 'lodash.debounce';

// Initial state
const initialState = fromJS({
  scrollPosition: 0,
  lanesBottomPosition: 1000000,
  parkingBottomPosition: 1000000,
  lanesInFocus: true,
  parkingInFocus: true,
  isScrolling: false,
  showSearch: false
});

// Actions
const SET_SCROLLPOSITION = 'Explore/SET_SCROLLPOSITION';
const SET_LANES_BOTTOM_POSITION = 'Explore/SET_LANES_BOTTOM_POSITION';
const SET_PARKING_BOTTOM_POSITION = 'Explore/SET_PARKING_BOTTOM_POSITION';
const SET_LANES_IN_FOCUS = 'Explore/SET_LANES_IN_FOCUS';
const SET_LANES_OUT_OF_FOCUS = 'Explore/SET_LANES_OUT_OF_FOCUS';
const SET_PARKING_IN_FOCUS = 'Explore/SET_PARKING_IN_FOCUS';
const SET_PARKING_OUT_OF_FOCUS = 'Explore/SET_PARKING_OUT_OF_FOCUS';
const STOPED_SCROLLING = 'Explore/STOPED_SCROLLING';
const START_SCROLLING = 'Explore/START_SCROLLING';
const SHOW_SEARCH = 'Explore/SHOW_SEARCH';
const CLOSE_SEARCH = 'Explore/CLOSE_SEARCH';

export function showSearch() {
  return {
    type: SHOW_SEARCH
  }
}

export function closeSearch() {
  return {
    type: CLOSE_SEARCH
  }
}

export const scrollingMayEnd = debounce((dispatch) => {
  dispatch({
    type: STOPED_SCROLLING
  });
}, 100);

export function setScrollPosition(scrollPosition) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_SCROLLPOSITION,
      payload: scrollPosition
    });

    if (!getState().explore.get('isScrolling')) {
      dispatch({
        type: START_SCROLLING
      });
    }

    scrollingMayEnd(dispatch);

    if (getState().explore.get('lanesBottomPosition') < scrollPosition) {
      // Set lanes out of focus
      dispatch({
        type: SET_LANES_OUT_OF_FOCUS,
      });
    } else if(!getState().explore.get('lanesInFocus')) {
      // Set lanes back in focus
      dispatch({
        type: SET_LANES_IN_FOCUS,
      });
    }

    if (getState().explore.get('parkingBottomPosition') < scrollPosition) {
      // Set parking out of focus
      dispatch({
        type: SET_PARKING_OUT_OF_FOCUS,
      });
    } else if(!getState().explore.get('parkingInFocus')) {
      // Set parking back in focus
      dispatch({
        type: SET_PARKING_IN_FOCUS,
      });
    }
  };
}

export function setLanesBottomPosition(lanesBottomPosition) {
  return {
    type: SET_LANES_BOTTOM_POSITION,
    payload: lanesBottomPosition
  }
}

export function setParkingBottomPosition(parkingBottomPosition) {
  return {
    type: SET_PARKING_BOTTOM_POSITION,
    payload: parkingBottomPosition
  }
}

// Reducer
export default function ExploreStateManagement(state = initialState, action = {}) {
  switch (action.type) {
    case SET_SCROLLPOSITION:
      return state.set('scrollPosition', action.payload);
    case SET_LANES_BOTTOM_POSITION:
      return state.set('lanesBottomPosition', action.payload);
    case SET_PARKING_BOTTOM_POSITION:
      return state.set('parkingBottomPosition', action.payload)
    case SET_LANES_IN_FOCUS:
      return state.set('lanesInFocus', true)
    case SET_LANES_OUT_OF_FOCUS:
      return state.set('lanesInFocus', false)
    case SET_PARKING_IN_FOCUS:
      return state.set('parkingInFocus', true)
    case SET_PARKING_OUT_OF_FOCUS:
      return state.set('parkingInFocus', false)
    case STOPED_SCROLLING:
      return state.set('isScrolling', false)
    case START_SCROLLING:
      return state.set('isScrolling', true)
    case SHOW_SEARCH:
      return state.set('showSearch', true)
    case CLOSE_SEARCH:
      return state.set('showSearch', false)
    default:
      return state;
  }
}

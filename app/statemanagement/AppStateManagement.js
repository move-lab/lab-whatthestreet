import { fromJS } from 'immutable';

// Initial state
const initialState = fromJS({
  baseUrl: null,
  scrollPosition: 0
});

// Actions
const SET_BASEURL = 'App/SET_BASE_URL';
const SET_SCROLLPOSITION = 'App/SET_SCROLLPOSITION';

export function setBaseUrl(baseUrl) {
  return {
    type: SET_BASEURL,
    payload: baseUrl
  }
}

export function setScrollPosition(scrollPosition) {
  return {
    type: SET_SCROLLPOSITION,
    payload: scrollPosition
  }
}

// Reducer
export default function AppStateManagement(state = initialState, action = {}) {
  switch (action.type) {
    case SET_BASEURL:
      return state.set('baseUrl', action.payload);
    case SET_SCROLLPOSITION:
      return state.set('scrollPosition', action.payload);
    default:
      return state;
  }
}

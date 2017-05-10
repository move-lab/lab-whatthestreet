import { fromJS } from 'immutable';

// Initial state
const initialState = fromJS({
  baseUrl: null
});

// Actions
const SET_BASEURL = 'App/SET_BASE_URL';

export function setBaseUrl(baseUrl) {
  return {
    type: SET_BASEURL,
    payload: baseUrl
  }
}

// Reducer
export default function AppStateManagement(state = initialState, action = {}) {
  switch (action.type) {
    case SET_BASEURL:
      return state.set('baseUrl', action.payload);
    default:
      return state;
  }
}

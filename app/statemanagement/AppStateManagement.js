import { fromJS } from 'immutable';
import Router from 'next/router';

// Initial state
const initialState = fromJS({
  baseUrl: null,
  isRouting: false,
  routerWatcherInitialized: false,
  urlRoutingTo: "",
  errorWhileRouting: false
});

// Actions
const SET_BASEURL = 'App/SET_BASE_URL';
const SET_ROUTER_WATCHER_INITIALIZED = 'App/SET_ROUTER_WATCHER_INITIALIZED';
const START_ROUTING = 'App/START_ROUTING';
const ERROR_ROUTING = 'App/ERROR_ROUTING';
const FINISH_ROUTING = 'App/FINISH_ROUTING';

export function setBaseUrl(baseUrl) {
  return {
    type: SET_BASEURL,
    payload: baseUrl
  }
}

export function startRouting(url) {
  return {
    type: START_ROUTING,
    payload: url
  }
}

export function finishRouting() {
  return {
    type: FINISH_ROUTING
  }
}

export function errorRouting() {
  return {
    type: ERROR_ROUTING
  }
}

export function initRouterWatcher() {
  return (dispatch, getState) => {

    if (getState().app.get('routerWatcherInitialized')) {
      return;
    }

    Router.onRouteChangeStart = (url) => {
      dispatch(startRouting(url));
    }
    Router.onRouteChangeComplete = () => {
      dispatch(finishRouting());
    }
    Router.onRouteChangeError = () => {
      dispatch(errorRouting());
    }
  }
}



// Reducer
export default function AppStateManagement(state = initialState, action = {}) {
  switch (action.type) {
    case SET_BASEURL:
      return state.set('baseUrl', action.payload);
    case SET_ROUTER_WATCHER_INITIALIZED:
      return state.set('routerWatcherInitialized', true);
    case START_ROUTING:
      return state
        .set('isRouting', true)
        .set('errorWhileRouting', false)
        .set('urlRoutingTo', action.payload);
    case FINISH_ROUTING:
      return state
        .set('isRouting', false)
        .set('errorWhileRouting', false)
        .set('urlRoutingTo', "");
    case ERROR_ROUTING:
      return state
        .set('isRouting', false)
        .set('errorWhileRouting', true)
        .set('urlRoutingTo', "");
    default:
      return state;
  }
}

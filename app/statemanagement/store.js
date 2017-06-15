import { createStore, applyMiddleware, compose } from 'redux';
import Immutable from 'immutable';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import { reduxSearch } from 'redux-search'

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify here name, actionsBlacklist, actionsCreators and other options
      }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware),
  reduxSearch({
    // Configure redux-search by telling it which resources to index for searching
    resourceIndexes: {
      carStreets: ['name']
    },
    // This selector is responsible for returning each collection of searchable resources
    resourceSelector: (resourceName, state) => {
      return state.searchableStreets.get(resourceName);
    }
  })
);


export const initStore = (initialState) => {
  let store;
  if (typeof window === 'undefined') {
    store = createStore(reducers, initialState, enhancer);
  } else {
    if (!window.store) {
      //For each key of initialState, convert to Immutable object
      //Because SSR passed it as plain object
      Object.keys(initialState).map(function(key, index) {
         initialState[key] = Immutable.fromJS(initialState[key]);
      });
      window.store = createStore(reducers, initialState, enhancer)
    }
    store = window.store
  }

  return store;
}

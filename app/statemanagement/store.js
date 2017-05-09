import { createStore, applyMiddleware, compose } from 'redux';
import Immutable from 'immutable';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import { cityData } from './sagas/citySagas';
import { guessData } from './sagas/guessSagas';
import { cityMetaData } from './sagas/cityMetaSagas';
// import { versusData } from './sagas/versusSagas';
// import { streetData } from './sagas/streetSagas';
// import { searchData } from './sagas/searchSagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify here name, actionsBlacklist, actionsCreators and other options
      }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
  // other store enhancers if any
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

  store.runSaga = sagaMiddleware.run;
  store.runSaga(cityData);
  store.runSaga(guessData);
  store.runSaga(cityMetaData);
  // store.runSaga(versusData);
  // store.runSaga(streetData);
  // store.runSaga(searchData);

  return store;
}

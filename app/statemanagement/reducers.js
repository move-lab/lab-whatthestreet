import { combineReducers } from 'redux';

import cityReducer from'./reducers/cityReducer';
// import vehicleReducer from './reducers/vehicleReducer';
// import scrollReducer from './reducers/scrollReducer';
// import parkingReducer from './reducers/parkingReducer';
import guessReducer from './reducers/guessReducer';
// import mapReducer from './reducers/mapReducer';
import cityMetaReducer from './reducers/cityMetaReducer';
// import versusReducer from './reducers/versusReducer';
// import laneReducer from './reducers/laneReducer';
// import pageReducer from './reducers/pageReducer';
// import streetReducer from './reducers/streetReducer';
// import searchReducer from './reducers/searchReducer';

export default combineReducers({
  // page: pageReducer,
  city: cityReducer,
  // vehicle: vehicleReducer,
  // scroll: scrollReducer,
  // parking: parkingReducer,
  // lanes: laneReducer,
  guess: guessReducer,
  // map: mapReducer,
  cityMeta: cityMetaReducer,
  // versus: versusReducer,
  // street: streetReducer,
  // search: searchReducer
});

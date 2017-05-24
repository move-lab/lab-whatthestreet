import { combineReducers } from 'redux';

import cityReducer from'./reducers/cityReducer';
import vehiclesStateManagement from './VehiclesStateManagement';
// import scrollReducer from './reducers/scrollReducer';
import parkingReducer from './reducers/parkingReducer';
import guessReducer from './reducers/guessReducer';
import mapReducer from './reducers/mapReducer';
import cityMetaReducer from './reducers/cityMetaReducer';
import appStateManagement from './AppStateManagement';
import exploreStateManagement from './ExploreStateManagement';
// import versusReducer from './reducers/versusReducer';
import laneReducer from './reducers/laneReducer';
// import pageReducer from './reducers/pageReducer';
import streetReducer from './reducers/streetReducer';
// import searchReducer from './reducers/searchReducer';

export default combineReducers({
  app: appStateManagement,
  explore: exploreStateManagement,
  // page: pageReducer,
  city: cityReducer,
  vehicles: vehiclesStateManagement,
  // scroll: scrollReducer,
  parking: parkingReducer,
  lanes: laneReducer,
  guess: guessReducer,
  map: mapReducer,
  cityMeta: cityMetaReducer,
  // versus: versusReducer,
  street: streetReducer,
  // search: searchReducer
});

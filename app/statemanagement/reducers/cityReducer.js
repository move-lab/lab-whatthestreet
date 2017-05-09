import { fromJS } from 'immutable';

import { CITY } from '../constants';

const initialState = fromJS({
  loading: false,
  error: false,
  availableCities: [],
  actual_city: {},
  nearestCity: {},
  show_city_selection: false,
});

export default function cityReducer(state = initialState, action) {
  switch (action.type) {
    case CITY.LOAD_CITIES_REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
        .set('availableCities', fromJS([]));
    case CITY.LOAD_CITIES_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('availableCities', action.cities.toJS().length > 0 && action.cities);
    case CITY.LOAD_CITIES_FAILURE:
      return state
        .set('loading', false)
        .set('error', true);
    case CITY.SELECT_CITY:
      return state
        .set('actual_city', state.toJS().availableCities[action.city]);
    case CITY.SET_NEAREST_CITY:
      return state
        .set('nearestCity', fromJS(action.city));
    case CITY.TOGGLE_CITY_SELECTION:
      return state
        .set('show_city_selection', !state.toJS().show_city_selection);
    default:
      return state;
  }
}

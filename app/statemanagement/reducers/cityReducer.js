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
    case CITY.LOAD_CITIES_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('availableCities', action.payload);
    case CITY.LOAD_CITIES_FAILURE:
      return state
        .set('loading', false)
        .set('error', true);
    case CITY.SELECT_CITY:
      return state
        .set('actual_city', state.get('availableCities')
                                 .find((city) => city.get('slug') === action.payload));
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

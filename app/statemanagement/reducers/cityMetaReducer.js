import { fromJS } from 'immutable';
import { CITY_META } from '../constants';

const initialState = fromJS({
  loading: false,
  error: false,
  metaData: {},
});

export default function cityReducer(state = initialState, action) {
  switch (action.type) {
    case CITY_META.LOAD_REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
        .set('metaData', fromJS({}));
    case CITY_META.LOAD_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('metaData', fromJS(action.data));
    case CITY_META.LOAD_FAILURE:
      return state
        .set('loading', false)
        .set('error', true);
    default:
      return state;
  }
}

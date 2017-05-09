import { CITY_META } from '../constants';

export function loadCityMetaData() {
  return {
    type: CITY_META.LOAD_REQUEST,
  };
}

export function loadCityMetaDataSuccess(data) {
  return {
    type: CITY_META.LOAD_SUCCESS,
    data,
  };
}

export function loadCityMetaDataFailure(err) {
  return {
    type: CITY_META.LOAD_FAILURE,
    error: err,
  };
}

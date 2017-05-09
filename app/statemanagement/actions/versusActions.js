import { VERSUS } from '../constants';

export function loadVersusData() {
  return {
    type: VERSUS.LOAD_REQUEST,
  };
}

export function loadVersusDataSuccess(data) {
  return {
    type: VERSUS.LOAD_SUCCESS,
    data,
  };
}

export function loadVersusDataFailure(err) {
  return {
    type: VERSUS.LOAD_FAILURE,
    error: err,
  };
}

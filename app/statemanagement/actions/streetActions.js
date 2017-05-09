import { STREET } from '../constants';

export function getStreetByID() {
  return {
    type: STREET.LOAD_STREET_REQUEST,
  };
}

export function setStreetId(id) {
  return {
    type: STREET.SET_STREET_ID,
    id,
  };
}

export function loadStreetSuccess(data) {
  return {
    type: STREET.LOAD_STREET_SUCCESS,
    data,
  };
}

export function loadStreetFailure(errorMessage) {
  return {
    type: STREET.LOAD_STREET_FAILURE,
    errorMessage,
  };
}

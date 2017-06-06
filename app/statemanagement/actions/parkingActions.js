import { SET_PARKINGSPACE, CLEAR_PARKINGSPACE } from '../constants';

export function setParkingSpace(data) {
  return {
    type: SET_PARKINGSPACE,
    payload: data
  };
}

export function clearParking() {
  return {
    type: CLEAR_PARKINGSPACE
  }
}

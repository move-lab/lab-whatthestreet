import { SET_PARKINGSPACE, CLEAR_PARKINGSPACE } from '../constants';

export function setParkingSpace(id, neighborhood, area) {
  return {
    type: SET_PARKINGSPACE,
    id,
    neighborhood,
    area,
  };
}

export function clearParking() {
  return {
    type: CLEAR_PARKINGSPACE
  }
}

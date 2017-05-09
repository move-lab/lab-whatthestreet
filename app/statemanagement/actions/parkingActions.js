import { SET_PARKINGSPACE } from '../constants';

export function setParkingSpace(id, neighborhood, area) {
  return {
    type: SET_PARKINGSPACE,
    id,
    neighborhood,
    area,
  };
}

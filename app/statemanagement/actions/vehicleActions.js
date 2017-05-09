import { SELECT_VEHICLE } from '../constants';

export function selectVehicle(identifyer) {
  return {
    type: SELECT_VEHICLE,
    vehicle: identifyer,
  };
}

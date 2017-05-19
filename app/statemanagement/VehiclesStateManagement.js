import { fromJS } from 'immutable';

// Initial state
const initialState = fromJS({
  availableVehicles: ['car', 'bike', 'rail'],
  vehicle: 'car'
});

// Actions
export const SELECT_VEHICLE = 'Vehicules/SELECT_VEHICLE';

export function selectVehicle(type) {
  return {
    type: SELECT_VEHICLE,
    payload: type,
  };
}

// Reducer
export default function VehicleStateManagement(state = initialState, action) {
  switch (action.type) {
    case SELECT_VEHICLE:
      return state
        .set('vehicle', action.payload);
    default:
      return state;
  }
}

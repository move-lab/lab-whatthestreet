import { fromJS } from 'immutable';
import { clearLane } from './actions/laneActions';
import { clearParking } from './actions/parkingActions';

// Initial state
const initialState = fromJS({
  availableVehicles: ['car', 'rail', 'bike'],
  vehicle: 'car'
});

// Actions
export const SELECT_VEHICLE = 'Vehicules/SELECT_VEHICLE';

export function selectVehicle(type) {
  return (dispatch) => {
    dispatch({
      type: SELECT_VEHICLE,
      payload: type,
    });

    dispatch(clearLane());
    dispatch(clearParking());
  }
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

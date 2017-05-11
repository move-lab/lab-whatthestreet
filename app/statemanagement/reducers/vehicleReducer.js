import { fromJS } from 'immutable';

import {
  SELECT_VEHICLE,
} from '../constants';

const initialState = fromJS({
  availableVehicles: ['bike', 'rails', 'car'],
  vehicle: 'bike',
});

function vehicleReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_VEHICLE:
      return state
        .set('vehicle', state.toJS().availableVehicles[action.vehicle]);
    default:
      return state;
  }
}

export default vehicleReducer;

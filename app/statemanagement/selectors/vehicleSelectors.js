import { createSelector } from 'reselect';

const selectVehicle = (state) => state.get('vehicle');

const makeSelectVehicles = () => createSelector(
  selectVehicle,
  (vehicleState) => vehicleState.get('availableVehicles').toJS()
);

const makeSelectActualVehicle = () => createSelector(
  selectVehicle,
  (vehicleState) => vehicleState.get('vehicle')
);


export {
  selectVehicle,
  makeSelectVehicles,
  makeSelectActualVehicle,
};

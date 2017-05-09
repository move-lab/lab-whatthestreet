import { createSelector } from 'reselect';

const selectParkingSlots = (state) => state.get('parking');


const makeSelectActualParkingPlace = () => createSelector(
  selectParkingSlots,
  (state) => ({ neighborhood: state.get('neighborhood'), area: state.get('area') })
);

export {
  makeSelectActualParkingPlace,
  selectParkingSlots,
};

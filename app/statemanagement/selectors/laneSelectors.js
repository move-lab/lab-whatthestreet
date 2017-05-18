import { createSelector } from 'reselect';

const selectLanes = (state) => state.lanes;

const makeSelectActualLane = () => createSelector(
  selectLanes,
  (state) => ({ neighborhood: state.get('neighborhood'), area: state.get('area'), name: state.get('name'), length: state.get('length'), coordinates: state.get('coordinates') })
);

export {
  selectLanes,
  makeSelectActualLane,
};

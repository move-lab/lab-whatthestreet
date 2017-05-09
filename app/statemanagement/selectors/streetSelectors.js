import { createSelector } from 'reselect';

export const selectStreetState = (state) => state.get('street');

export const selectStreetId = () => createSelector(
  selectStreetState,
  (state) => state.get('id')
);

export const selectStreet = () => createSelector(
  selectStreetState,
  (state) => state.get('data').toJS()
);

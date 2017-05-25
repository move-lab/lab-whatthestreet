import { createSelector } from 'reselect';

export const selectVersusState = (state) => state.versus;

export const makeSelectVersusData = () => createSelector(
  selectVersusState,
  (state) => state.get('data').toJS()
);

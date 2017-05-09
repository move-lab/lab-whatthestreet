import { createSelector } from 'reselect';

export const selectVersusState = (state) => state.get('versus');

export const makeSelectVersusData = () => createSelector(
  selectVersusState,
  (state) => state.get('data').toJS()
);

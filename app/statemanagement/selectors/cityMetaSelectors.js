import { createSelector } from 'reselect';

export const selectCityMeta = (state) => state.get('cityMeta');

export const makeSelectCityMetaData = () => createSelector(
  selectCityMeta,
  (state) => state.get('metaData').toJS()
);

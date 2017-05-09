import { createSelector } from 'reselect';

export const selectCityMeta = (state) => state.cityMeta;

export const makeSelectCityMetaData = () => createSelector(
  selectCityMeta,
  (state) => state.get('metaData').toJS()
);

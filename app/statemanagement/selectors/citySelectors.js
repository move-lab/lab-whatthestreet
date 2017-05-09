import { createSelector } from 'reselect';

const selectCityState = (state) => state.city;

const makeSelectCities = () => createSelector(
  selectCityState,
  (cityState) => cityState.get('availableCities').toJS()
);

const makeSelectActualCity = () => createSelector(
  selectCityState,
  (actualCityState) => actualCityState.get('actual_city')
);

const makeShowCitySelection = () => createSelector(
  selectCityState,
  (actualCitySelectionState) => actualCitySelectionState.get('show_city_selection')
);

export const selectNearestCity = () => createSelector(
  selectCityState,
  (actualCitySelectionState) => actualCitySelectionState.get('show_city_selection')
);

export {
  selectCityState,
  makeSelectCities,
  makeSelectActualCity,
  makeShowCitySelection,
};

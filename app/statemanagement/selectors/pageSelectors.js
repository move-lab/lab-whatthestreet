import { createSelector } from 'reselect';

export const selectPage = (state) => state.get('page');

export const selectShowAbout = () => createSelector(
  selectPage,
  (state) => state.get('showAbout')
);

export const selectShowMap = () => createSelector(
  selectPage,
  (state) => state.get('showMap')
);

export const selectGifCreationMode = () => createSelector(
  selectPage,
  (state) => state.get('gifCreationMode')
);

export const selectShowSearch = () => createSelector(
  selectPage,
  (state) => state.get('showSearch')
);

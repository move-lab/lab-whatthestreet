// Libraries
import { createSelector } from 'reselect';

// Selectors

/** Select Search State */
export const selectSearchState = (state) => state.get('search');

/** Select search term */
export const selectTerm = () => createSelector(
  selectSearchState,
  (state) => state.get('term')
);

/** Select Results */
export const selectResults = () => createSelector(
  selectSearchState,
  (state) => state.get('results').toJS()
);

/** Select Results */
export const selectSelectedResult = () => createSelector(
  selectSearchState,
  (state) => state.get('selectedResult').toJS()
);

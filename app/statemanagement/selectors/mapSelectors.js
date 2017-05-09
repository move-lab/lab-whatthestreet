import { createSelector } from 'reselect';

const selectMap = (state) => state.get('map');

export const selectLatitude = () => createSelector(
  selectMap,
  (state) => state.get('latitude')
);

export const selectLongitude = () => createSelector(
  selectMap,
  (state) => state.get('longitude')
);

export const selectNeighborhood = () => createSelector(
  selectMap,
  (state) => state.get('neighborhood')
);

export const selectZoom = () => createSelector(
  selectMap,
  (state) => state.get('zoom')
);

export const selectArea = () => createSelector(
  selectMap,
  (state) => state.get('area')
);

export const selectCoordinates = () => createSelector(
  selectMap,
  (state) => state.get('coordinates').toJS()
);

export const selectMapMode = () => createSelector(
  selectMap,
  (state) => state.get('mapMode')
);

export const selectMapLoadingState = () => createSelector(
  selectMap,
  (state) => state.get('loading')
);

export const selectRotation = () => createSelector(
  selectMap,
  (state) => state.get('rotation')
);

export const selectCenter = () => createSelector(
  selectMap,
  (state) => state.get('center').toJS()
);

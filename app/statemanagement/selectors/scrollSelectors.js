import { createSelector } from 'reselect';

const selectScrollIndex = (state) => state.get('scroll');

const makeSelectActualScrollIndex = () => createSelector(
  selectScrollIndex,
  (scrollState) => scrollState.get('scrollIndex')
);

const makeSelectScrollTargets = () => createSelector(
  selectScrollIndex,
  (scrollState) => scrollState.get('scrollTargets').toJS()
);

const makeSelectScrollingStatus = () => createSelector(
  selectScrollIndex,
  (scrollState) => scrollState.get('scrolling')
);

export {
  makeSelectActualScrollIndex,
  makeSelectScrollTargets,
  makeSelectScrollingStatus,
};

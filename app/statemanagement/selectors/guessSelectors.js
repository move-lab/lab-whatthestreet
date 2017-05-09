import { createSelector } from 'reselect';

const selectGuess = (state) => state.guess;

const makeSelectOthersGuesses = () => createSelector(
  selectGuess,
  (state) => state.get('others').toJS()
);

const makeSelectActualGuesses = () => createSelector(
  selectGuess,
  (state) => state.get('actual').toJS()
);

const makeSelectOwnGuess = () => createSelector(
  selectGuess,
  (state) => state.get('own').toJS()
);

const makeSelectGuessLoadingState = () => createSelector(
  selectGuess,
  (state) => state.get('loading')
);

export {
  selectGuess,
  makeSelectOthersGuesses,
  makeSelectActualGuesses,
  makeSelectOwnGuess,
  makeSelectGuessLoadingState,
};

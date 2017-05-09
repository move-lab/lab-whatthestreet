import { SEARCH } from '../constants';

export const loadResults = () => ({ type: SEARCH.LOAD_RESULTS_REQUEST });
export const loadResultsSuccess = (data) => ({ type: SEARCH.LOAD_RESULTS_SUCCESS, results: data });
export const loadResultsFailure = (errorMessage) => ({ type: SEARCH.LOAD_RESULTS_FAILURE, errorMessage });
export const selectResult = (result) => ({ type: SEARCH.SELECT_RESULT, result });
export const changeTerm = (term) => ({ type: SEARCH.CHANGE_TERM, term });
export const addToSearchbase = (items) => ({ type: SEARCH.ADD_TO_SEARCHBASE, items });

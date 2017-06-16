import { VERSUS } from '../constants';
import axios from 'axios';

export function startLoadVersusData() {
  return {
    type: VERSUS.LOAD_REQUEST,
  };
}

export function loadVersusDataSuccess(data) {
  return {
    type: VERSUS.LOAD_SUCCESS,
    data,
  };
}

export function loadVersusDataFailure(err) {
  return {
    type: VERSUS.LOAD_FAILURE,
    error: err,
  };
}

export function loadVersusData(citySlug) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const baseUrl = getState().app.get('baseUrl');
      const authHeader = getState().app.get('authHeader');
      dispatch(startLoadVersusData());

      axios.get(`${baseUrl}/api/v1/cities/${citySlug}/versus`,{
        headers: {
           "Authorization" : authHeader
        }
      }).then((response) => {
        dispatch(loadVersusDataSuccess(response.data));
        resolve();
      }, (error) => {
        dispatch(loadVersusDataFailure(error))
        reject(error);
      });
    });
  }
}

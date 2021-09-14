import Url from '../../utils/Url';
import rfetch from './rfetch';

import {
  ON_CADEADOS_LOADING,
  ON_CADEADOS_SUCCESS,
  ON_CADEADOS_ERROR,
  ON_CADEADOS_CLEAR,
} from '../types';

export const getCadeados = () => async (dispatch, getState) => {
  dispatch({ type: ON_CADEADOS_LOADING, payload: null });
  try {
    const url = Url.getCadeadosUrl();
    const res = await rfetch(
      url,
      {
        method: 'GET',
      },
      dispatch,
      getState
    );
    const json = await res.json();
    if (res.status === 200) {
      dispatch({ type: ON_CADEADOS_SUCCESS, payload: json.data });
    } else {
      dispatch({ type: ON_CADEADOS_ERROR, payload: json?.error });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: ON_CADEADOS_ERROR, payload: err.message });
  }
};

export const clearCadeados = () => async (dispatch, getState) => {
  dispatch({ type: ON_CADEADOS_CLEAR, payload: null });
};

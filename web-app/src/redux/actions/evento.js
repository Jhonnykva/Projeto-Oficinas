import Url from '../../utils/Url';
import rfetch from './rfetch';

import {
  ON_EVENTOS_LOADING,
  ON_EVENTOS_SUCCESS,
  ON_EVENTOS_ERROR,
  ON_EVENTOS_CLEAR,
} from '../types';

export const getEventos = () => async (dispatch, getState) => {
  dispatch({ type: ON_EVENTOS_LOADING, payload: null });
  try {
    const url = Url.getEventosUrl();
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
      dispatch({ type: ON_EVENTOS_SUCCESS, payload: json.data });
    } else {
      dispatch({ type: ON_EVENTOS_ERROR, payload: json?.error });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: ON_EVENTOS_ERROR, payload: err.message });
  }
};

export const clearEventos = () => async (dispatch, getState) => {
  dispatch({ type: ON_EVENTOS_CLEAR, payload: null });
};

import Url from '../../utils/Url';
import {
  ON_LOGIN,
  ON_LOGIN_ERROR,
  ON_LOGIN_SUCCESS,
  ON_LOGOUT,
  CLEAR_LOGIN_ERROR,
} from '../types';

export const login = (usuario, password) => async (dispatch, getState) => {
  dispatch({ type: ON_LOGIN, payload: null });
  try {
    const url = Url.getLoginUrl();
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        alias: usuario,
        pass: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    if (res.status === 200) {
      dispatch({ type: ON_LOGIN_SUCCESS, payload: `Bearer ${json.token}` });
    } else {
      dispatch({ type: ON_LOGIN_ERROR, payload: json?.error });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: ON_LOGIN_ERROR, payload: err.message });
  }
};

export const logout = () => async (dispatch, getState) => {
  dispatch({ type: ON_LOGOUT, payload: null });
};

export const clearLoginError = () => async (dispatch, getState) => {
  dispatch({ type: CLEAR_LOGIN_ERROR, payload: null });
};

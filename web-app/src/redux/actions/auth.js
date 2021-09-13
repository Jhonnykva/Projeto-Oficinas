import Url from '../../utils/Url';
import {
  ON_LOGIN,
  ON_LOGIN_ERROR,
  ON_LOGIN_SUCCESS,
  ON_LOGOUT,
  CLEAR_LOGIN_ERROR,
} from '../types';

export const login =
  (usuario, password, rememberMe) => async (dispatch, getState) => {
    dispatch({ type: ON_LOGIN, payload: null });
    try {
      const url = Url.getLoginUrl();
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          alias: usuario,
          password,
          rememberMe,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await res.json();
      console.log(json);
      if (json.success) {
        dispatch({ type: ON_LOGIN_SUCCESS, payload: json.token });
      } else {
        dispatch({ type: ON_LOGIN_ERROR, payload: json?.error });
        return true;
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: ON_LOGIN_ERROR, payload: err.message });
    }
    return false;
  };

export const logout =
  (usuario, password, rememberMe) => async (dispatch, getState) => {
    dispatch({ type: ON_LOGOUT, payload: null });
  };

export const clearLoginError = () => async (dispatch, getState) => {
  dispatch({ type: CLEAR_LOGIN_ERROR, payload: null });
};

import {
  CLEAR_LOGIN_ERROR,
  ON_LOGIN,
  ON_LOGIN_ERROR,
  ON_LOGIN_SUCCESS,
  ON_INVALID_AUTH,
  ON_LOGOUT,
} from '../types';

const initialState = {
  loading: false,
  token: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_LOGIN:
      return { ...state, loading: true, error: initialState.error };
    case ON_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
        error: initialState.error,
      };
    case ON_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        token: initialState.token,
        error: action.payload,
      };
    case ON_LOGOUT:
      return {
        ...state,
        token: initialState.token,
        error: initialState.error,
      };
    case CLEAR_LOGIN_ERROR:
      return { ...state, error: initialState.error, loading: false };
    case ON_INVALID_AUTH:
      return {
        ...state,
        token: initialState.token,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;

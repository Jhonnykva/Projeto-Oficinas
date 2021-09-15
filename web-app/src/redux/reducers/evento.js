import {
  ON_EVENTOS_LOADING,
  ON_EVENTOS_SUCCESS,
  ON_EVENTOS_ERROR,
  ON_EVENTOS_CLEAR,
} from '../types';

const initialState = {
  loading: false,
  eventos: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_EVENTOS_LOADING:
      return { ...state, loading: true, error: initialState.error };
    case ON_EVENTOS_SUCCESS:
      return {
        ...state,
        loading: false,
        eventos: action.payload,
        error: initialState.error,
      };
    case ON_EVENTOS_ERROR:
      return {
        ...state,
        loading: false,
        eventos: initialState.eventos,
        error: action.payload,
      };
    case ON_EVENTOS_CLEAR:
      return {
        ...state,
        loading: false,
        eventos: initialState.eventos,
        error: initialState.error,
      };
    default:
      return state;
  }
};

export default authReducer;

import {
  ON_CADEADOS_LOADING,
  ON_CADEADOS_SUCCESS,
  ON_CADEADOS_ERROR,
  ON_CADEADOS_CLEAR,
} from '../types';

const initialState = {
  loading: false,
  cadeados: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_CADEADOS_LOADING:
      return { ...state, loading: true, error: initialState.error };
    case ON_CADEADOS_SUCCESS:
      return {
        ...state,
        loading: false,
        cadeados: action.payload,
        error: initialState.error,
      };
    case ON_CADEADOS_ERROR:
      return {
        ...state,
        loading: false,
        cadeados: initialState.cadeados,
        error: action.payload,
      };
    case ON_CADEADOS_CLEAR:
      return {
        ...state,
        loading: false,
        cadeados: initialState.cadeados,
        error: initialState.error,
      };
    default:
      return state;
  }
};

export default authReducer;

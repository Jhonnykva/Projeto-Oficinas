import {
  ON_CADEADOS_LOADING,
  ON_CADEADOS_SUCCESS,
  ON_CADEADOS_ERROR,
  ON_CADEADOS_CLEAR,
  ON_CADEADO_SUCCESS,
  ON_CADEADO_ERROR,
  ON_CADEADO_CLEAR,
  ON_REGISTER_CADEADO,
  ON_UPDATE_CADEADO,
  ON_REGISTER_LIBERADOR,
  ON_UPDATE_LIBERADOR,
} from '../types';

const initialState = {
  loading: false,
  cadeados: null,
  error: null,
  selected: null,
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
    case ON_CADEADO_SUCCESS:
      return {
        ...state,
        loading: false,
        selected: action.payload,
        error: initialState.error,
      };
    case ON_CADEADO_ERROR:
      return {
        ...state,
        loading: false,
        selected: initialState.selected,
        error: action.payload,
      };
    case ON_CADEADO_CLEAR:
      return {
        ...state,
        loading: false,
        selected: initialState.selected,
        error: initialState.error,
      };
    case ON_REGISTER_CADEADO:
      return {
        ...state,
        loading: false,
        cadeados: [...state.cadeados, action.payload],
        error: initialState.error,
      };
    case ON_UPDATE_CADEADO:
      return {
        ...state,
        loading: false,
        cadeados: state.cadeados.map((cadeado) =>
          cadeado.id !== action.payload.id ? cadeado : action.payload
        ),
        error: initialState.error,
      };
    case ON_REGISTER_LIBERADOR:
      if (state.selected === null) return { ...state, loading: false };
      return {
        ...state,
        loading: false,
        selected: {
          ...state.selected,
          liberadores: [action.payload, ...state.selected.liberadores],
        },
        error: initialState.error,
      };
    case ON_UPDATE_LIBERADOR:
      console.log(state);
      console.log(state.selected.liberadores);
      return {
        ...state,
        loading: false,
        selected: {
          ...state.selected,
          liberadores: state.selected.liberadores.map((liberador) =>
            liberador.id !== action.payload.id ? liberador : action.payload
          ),
        },
        error: initialState.error,
      };
    default:
      return state;
  }
};

export default authReducer;

import Url from '../../utils/Url';
import rfetch from './rfetch';

import {
  ON_CADEADOS_LOADING,
  ON_CADEADOS_SUCCESS,
  ON_CADEADOS_ERROR,
  ON_CADEADOS_CLEAR,
  ON_CADEADO_SUCCESS,
  ON_CADEADO_ERROR,
  ON_CADEADO_CLEAR,
  ON_UPDATE_CADEADO,
  ON_REGISTER_CADEADO,
  ON_UPDATE_LIBERADOR,
  ON_REGISTER_LIBERADOR,
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

export const getCadeado = (id) => async (dispatch, getState) => {
  dispatch({ type: ON_CADEADOS_LOADING, payload: null });
  try {
    const url = Url.getCadeadoByIdUrl(id);
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
      dispatch({ type: ON_CADEADO_SUCCESS, payload: json.data });
    } else {
      dispatch({ type: ON_CADEADO_ERROR, payload: json?.error });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: ON_CADEADO_ERROR, payload: err.message });
  }
};

export const clearCadeado = () => async (dispatch, getState) => {
  dispatch({ type: ON_CADEADO_CLEAR, payload: null });
};

export const getLiberadorCadeadoQrCode = (id) => async (dispatch, getState) => {
  try {
    const url = Url.getLiberadorCadeadoQrCodeUrl(id);
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
      return { success: true, data: json.data };
    } else {
      return { success: false, error: json.error };
    }
  } catch (err) {
    console.error(err);
  }
  return { success: false, error: 'Erro inesperado' };
};

export const registerCadeado = (cadeado) => async (dispatch, getState) => {
  dispatch({ type: ON_CADEADOS_LOADING, payload: null });
  try {
    const url = Url.registerCadeadoUrl();
    const res = await rfetch(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cadeado),
      },
      dispatch,
      getState
    );
    const json = await res.json();
    if (res.status === 200) {
      dispatch({ type: ON_REGISTER_CADEADO, payload: json.data });
    } else {
      dispatch({ type: ON_CADEADO_ERROR, payload: json?.error });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: ON_CADEADO_ERROR, payload: err.message });
  }
};

export const updateCadeado = (cadeado) => async (dispatch, getState) => {
  if (!cadeado.id) return;
  dispatch({ type: ON_CADEADOS_LOADING, payload: null });
  try {
    const url = Url.updateCadeadoUrl(cadeado.id);
    const res = await rfetch(
      url,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cadeado),
      },
      dispatch,
      getState
    );
    const json = await res.json();
    if (res.status === 200) {
      dispatch({ type: ON_UPDATE_CADEADO, payload: json.data });
    } else {
      dispatch({ type: ON_CADEADO_ERROR, payload: json?.error });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: ON_CADEADO_ERROR, payload: err.message });
  }
};

export const registerLiberador = (liberador) => async (dispatch, getState) => {
  dispatch({ type: ON_CADEADOS_LOADING, payload: null });
  try {
    const url = Url.registerLiberadorUrl();
    const res = await rfetch(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...liberador,
          id_cadeado: getState().cadeado.selected.id,
        }),
      },
      dispatch,
      getState
    );
    const json = await res.json();
    if (res.status === 200) {
      dispatch({ type: ON_REGISTER_LIBERADOR, payload: json.data });
    } else {
      dispatch({ type: ON_CADEADO_ERROR, payload: json?.error });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: ON_CADEADO_ERROR, payload: err.message });
  }
};

export const updateLiberador = (liberador) => async (dispatch, getState) => {
  if (!liberador.id) return;
  dispatch({ type: ON_CADEADOS_LOADING, payload: null });
  try {
    const url = Url.updateLiberadorUrl(liberador.id);
    const res = await rfetch(
      url,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(liberador),
      },
      dispatch,
      getState
    );
    const json = await res.json();
    if (res.status === 200) {
      dispatch({ type: ON_UPDATE_LIBERADOR, payload: json.data });
    } else {
      dispatch({ type: ON_CADEADO_ERROR, payload: json?.error });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: ON_CADEADO_ERROR, payload: err.message });
  }
};

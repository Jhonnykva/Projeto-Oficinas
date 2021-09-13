import sfetch from '../../utils/sfectch';
import { ON_INVALID_AUTH } from '../types';

const rfetch = async (
  url,
  { useAuth, token, ...mOptions },
  dispatch,
  getState
) => {
  if (typeof useAuth !== 'boolean') useAuth = true;

  let options = { ...mOptions };
  if (useAuth) options.token = token ? token : getState().auth.token;
  const res = await sfetch(url, options);

  if (res.status === 401) {
    dispatch({ type: ON_INVALID_AUTH, payload: 'Não autorizado' });
  }
  return res;
};

export default rfetch;

import { combineReducers } from 'redux';

import auth from './auth';
import cadeado from './cadeado';

export default combineReducers({
  auth,
  cadeado,
});

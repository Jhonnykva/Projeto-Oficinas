import { combineReducers } from 'redux';

import auth from './auth';
import cadeado from './cadeado';
import evento from './evento';

export default combineReducers({
  auth,
  cadeado,
  evento,
});

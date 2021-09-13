// Base redux imports
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
// Imports for data persistence
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {};

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth'], // which reducer want to store
};

const pReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];
const composedMiddleware =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middleware)
    : composeWithDevTools(applyMiddleware(...middleware));

export const store = createStore(pReducer, initialState, composedMiddleware);
export const persistor = persistStore(store);

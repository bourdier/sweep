import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { movieDetailsSlice } from "./movieDetails/reducer";
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['movieDetails'],
};

const rootReducer = combineReducers({
  movieDetails: movieDetailsSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleware,
});

export const persistor = persistStore(store);

export const clearPersistedState = () => {
  persistor.purge();
}
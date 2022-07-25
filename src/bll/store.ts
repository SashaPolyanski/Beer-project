import { combineReducers, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import thunk from 'redux-thunk';

import { appReducer } from './slices/app';
import { beerReducer } from './slices/beers';

const rootReducer = combineReducers({
  beer: beerReducer,
  app: appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});
export type RootState = ReturnType<typeof rootReducer>;
export const useAppDispatch = () => useDispatch<ThunkDispatch<RootState, unknown, any>>();

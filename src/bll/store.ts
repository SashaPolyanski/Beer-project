import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { beerReducer } from './slices/beer';

const rootReducer = combineReducers({
  beer: beerReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

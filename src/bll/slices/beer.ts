import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ResponseType } from '../../dal/api';

type IBearsState = {
  beers: ResponseType[];
  beer: ResponseType[];
  currentPage: number;
  perPage: number;
  totalCount: number;
};
const authSlice = createSlice({
  name: 'beer',
  initialState: {
    beers: [],
    beer: [],
    currentPage: 1,
    perPage: 10,
    totalCount: 325,
  } as IBearsState,
  reducers: {
    setAllBeers(state, action: PayloadAction<{ beers: ResponseType[] }>) {
      state.beers = action.payload.beers;
    },
    setCurrentBeer(state, action: PayloadAction<{ beer: ResponseType[] }>) {
      state.beer = action.payload.beer;
    },
    setCurrentPage(state, action: PayloadAction<{ page: number }>) {
      state.currentPage = action.payload.page;
    },
  },
});

export const { setAllBeers, setCurrentBeer, setCurrentPage } = authSlice.actions;
export const beerReducer = authSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { api, ResponseType } from '../../dal/api';

import { setLoading } from './app';

type BeersStateType = {
  beers: ResponseType[];
  beer: ResponseType[];
  currentPage: number;
  perPage: number;
  totalCount: number;
};

export const fetchBeers = createAsyncThunk(
  'beers/fetchBeers',
  async (param: { currentPage: number; perPage: number }, { dispatch }) => {
    try {
      dispatch(setLoading({ value: true }));
      const beers = await api.getBeers(param.currentPage, param.perPage);
      dispatch(setAllBeers({ beers }));
      dispatch(setLoading({ value: false }));
      // eslint-disable-next-line no-empty
    } catch (e) {}
  },
);
export const fetchFilterBeers = createAsyncThunk(
  'beers/fetchFilterBeers',
  async (param: { beerName: string; perPage: number }, { dispatch }) => {
    try {
      dispatch(setLoading({ value: true }));
      const beers = await api.getFilteredBeers(param.beerName, param.perPage);
      dispatch(setAppFilterBeerPages({ beers }));
      dispatch(setLoading({ value: false }));
      // eslint-disable-next-line no-empty
    } catch (e) {}
  },
);
export const fetchBeer = createAsyncThunk(
  'beers/fetchBeer',
  async (id: number, { dispatch }) => {
    try {
      dispatch(setLoading({ value: true }));
      const beer = await api.getCurrentBeer(id);
      dispatch(setCurrentBeer({ beer }));
      dispatch(setLoading({ value: false }));
      // eslint-disable-next-line no-empty
    } catch (e) {}
  },
);

const beersSlice = createSlice({
  name: 'beer',
  initialState: {
    beers: [],
    beer: [],
    currentPage: 1,
    perPage: 5,
    totalCount: 0,
  } as BeersStateType,
  reducers: {
    setAllBeers(state, action: PayloadAction<{ beers: ResponseType[] }>) {
      state.beers = action.payload.beers;
      state.totalCount = 325;
    },
    setCurrentBeer(state, action: PayloadAction<{ beer: ResponseType[] }>) {
      state.beer = action.payload.beer;
    },
    setCurrentPage(state, action: PayloadAction<{ page: number }>) {
      state.currentPage = action.payload.page;
    },
    setAppFilterBeerPages(state, action: PayloadAction<{ beers: ResponseType[] }>) {
      state.beers = action.payload.beers;
      state.totalCount = state.beers.length;
    },
  },
});

export const { setAllBeers, setCurrentBeer, setCurrentPage, setAppFilterBeerPages } =
  beersSlice.actions;
export const beerReducer = beersSlice.reducer;

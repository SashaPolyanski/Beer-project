import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { api, ResponseType } from '../../dal/api';

import { setError, setLoading } from './app';

type BeersStateType = {
  beers: ResponseType[];
  beer: ResponseType[];
  currentPage: number;
  perPage: number;
  totalCount: number;
};

export const fetchBeers = createAsyncThunk(
  'beers/fetchBeers',
  async (
    param: {
      currentPage: number;
      perPage: number;
      beerName?: string;
      isTotalCountNeedUpdate: boolean;
    },
    { dispatch },
  ) => {
    try {
      dispatch(setLoading({ value: true }));
      const beers = await api.getBeers(param.currentPage, param.perPage, param.beerName);
      if (param.beerName) {
        if (param.isTotalCountNeedUpdate) {
          const totalCount = await api.getTotalCount(param.beerName);
          dispatch(setTotalCount({ totalCount }));
        }
        dispatch(setFilteredBeers({ beers }));
      } else {
        dispatch(setAllBeers({ beers }));
      }

      dispatch(setLoading({ value: false }));
    } catch (error) {
      dispatch(setError({ error: (error as Error).message }));
      dispatch(setLoading({ value: false }));
    }
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
    } catch (error) {
      dispatch(setError({ error: (error as Error).message }));
      dispatch(setLoading({ value: false }));
    }
  },
);

const beersSlice = createSlice({
  name: 'beer',
  initialState: {
    beers: [],
    beer: [],
    currentPage: 1,
    perPage: 4,
    totalCount: 325,
  } as BeersStateType,
  reducers: {
    setAllBeers(state, action: PayloadAction<{ beers: ResponseType[] }>) {
      state.beers = action.payload.beers;
      state.totalCount = 325;
    },
    setCurrentBeer(state, action: PayloadAction<{ beer?: ResponseType[]; id?: number }>) {
      if (action.payload.id) {
        state.beer = state.beers.filter(f => f.id === action.payload.id);
      } else {
        action.payload.beer && (state.beer = action.payload.beer);
      }
    },
    setCurrentPage(state, action: PayloadAction<{ page: number }>) {
      state.currentPage = action.payload.page;
    },
    setTotalCount(state, action: PayloadAction<{ totalCount: number }>) {
      state.totalCount = action.payload.totalCount;
    },
    setFilteredBeers(state, action: PayloadAction<{ beers: ResponseType[] }>) {
      state.beers = action.payload.beers;
    },
  },
});

export const {
  setAllBeers,
  setCurrentBeer,
  setCurrentPage,
  setTotalCount,
  setFilteredBeers,
} = beersSlice.actions;
export const beerReducer = beersSlice.reducer;

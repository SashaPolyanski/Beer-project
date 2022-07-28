import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NumberConstants } from '../../common/constants/constants';
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
      // eslint-disable-next-line no-empty
    } catch (e) {}
  },
);
// export const fetchFilterBeers = createAsyncThunk(
//   'beers/fetchFilterBeers',
//   async (param: { beerName: string; perPage: number }, { dispatch }) => {
//     try {
//       dispatch(setLoading({ value: true }));
//       const beers = await api.getFilteredBeers(param.beerName);
//       dispatch(setAppFilterBeerPages({ beers }));
//       dispatch(setLoading({ value: false }));
//       // eslint-disable-next-line no-empty
//     } catch (e) {}
//   },
// );
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
    perPage: 4,
    totalCount: 325,
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

import { RootState } from '../store';

export const SelectAllBeer = (state: RootState) => state.beer.beers;
export const SelectCurrentBeer = (state: RootState) => state.beer.beer;
export const SelectPerPage = (state: RootState) => state.beer.perPage;
export const SelectCurrentPage = (state: RootState) => state.beer.currentPage;
export const SelectTotalCount = (state: RootState) => state.beer.totalCount;
export const SelectIsLoading = (state: RootState) => state.app.isLoading;

import { RootState } from '../store';

export const SelectAllBeer = (state: RootState) => state.beerReducer.beers;
export const SelectCurrentBeer = (state: RootState) => state.beerReducer.beer;
export const SelectPerPage = (state: RootState) => state.beerReducer.perPage;
export const SelectCurrentPage = (state: RootState) => state.beerReducer.currentPage;
export const SelectTotalCount = (state: RootState) => state.beerReducer.totalCount;
export const SelectIsLoading = (state: RootState) => state.appReducer.isLoading;

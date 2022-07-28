import { RootState } from '../store';

export const selectAllBeer = (state: RootState) => state.beerReducer.beers;
export const selectCurrentBeer = (state: RootState) => state.beerReducer.beer;
export const selectPerPage = (state: RootState) => state.beerReducer.perPage;
export const selectCurrentPage = (state: RootState) => state.beerReducer.currentPage;
export const selectTotalCount = (state: RootState) => state.beerReducer.totalCount;
export const selectIsLoading = (state: RootState) => state.appReducer.isLoading;

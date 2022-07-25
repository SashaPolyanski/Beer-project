import { instance } from './settings';

export const api = {
  getBeers(currentPage: number, perPage: number) {
    return instance.get<ResponseType[]>(`beers?page=${currentPage}&per_page=${perPage}`);
  },
  getCurrentBeer(id: number) {
    return instance.get<ResponseType[]>(`beers/${id}`);
  },
};

export type ResponseType = {
  id: number;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  abv: number;
  food_pairing: string[];
};

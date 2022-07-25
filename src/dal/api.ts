import { instance } from './settings';

export const api = {
  getBeers(page: number, perPage: number) {
    // return instance.get<ResponseType[]>(`beers?page=${currentPage}&per_page=${perPage}`);
    return instance
      .get<ResponseType[]>(`beers`, {
        params: { page, per_page: perPage },
      })
      .then(res => res.data);
  },
  getCurrentBeer(id: number) {
    return instance.get<ResponseType[]>(`beers/${id}`).then(res => res.data);
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

import { ConstantsNumber, Url } from '../common/constants/constants';

import { instance } from './settings';

export const api = {
  getBeers(page: number, perPage: number, beerName?: string) {
    return instance
      .get<ResponseType[]>(Url.BEERS, {
        params: { page, per_page: perPage, beer_name: beerName },
      })
      .then(res => res.data);
  },
  getTotalCount(beerName?: string) {
    return instance
      .get<ResponseType[]>(Url.BEERS, {
        params: { beer_name: beerName, per_page: ConstantsNumber.per_page },
      })
      .then(res => res.data.length);
  },
  getCurrentBeer(id: number) {
    return instance.get<ResponseType[]>(`${Url.BEERS}/${id}`).then(res => res.data);
  },
};

// Типизировал только часть стейта, если приложение будет расширяться,
// то нужно делать типизацию всего респонса

export type ResponseType = {
  id: number;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  abv: number;
  food_pairing: string[];
};

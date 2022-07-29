import axios from 'axios';

import { Url } from '../common/constants/constants';

export const instance = axios.create({
  baseURL: Url.BASE_URL,
});

import axios from 'axios';

import { BaseUrl } from '../common/constants/constants';

export const instance = axios.create({
  baseURL: BaseUrl.BASE_URL,
});

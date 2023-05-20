import axios from 'axios';
import { GetUserFromToken } from './getUserFromToken';

axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${GetUserFromToken().token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export { axios };

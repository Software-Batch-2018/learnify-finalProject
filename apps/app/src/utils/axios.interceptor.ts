import axios from 'axios';
import {returnToken} from './auth.check'
axios.interceptors.request.use(
  async function (config) {
    const token = await returnToken() 
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export { axios };

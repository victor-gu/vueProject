import axios from 'axios';
import { getToken } from '@/utils/auth';
import store from '../store';

axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
axios.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = getToken();
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axios;

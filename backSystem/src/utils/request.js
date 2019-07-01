import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken, setToken, setExpiration } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 10000 // 请求10秒超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json'
  if (store.getters.token) {
    config.headers['Authorization'] = getToken() // 让每个请求携带自定义token
  }
  return config
}, error => {
  Promise.reject(error)
})

// response 拦截器
service.interceptors.response.use(response => {
  if (response.status !== 200) {
    return Promise.reject('error')
  } else {
    if (response.headers.expiration) setExpiration(response.headers.expiration);
    store.dispatch('PastToken');
    if (response.headers.authorization) {
      setToken(response.headers.authorization);
      store.dispatch('SetMyToken', response.headers.authorization);
    }
    return response.data;
  }
}, error => {
  store.dispatch('errorToke').then(() => {}).catch(() => {
    if (error.response.status === 400) {
      Message({
        message: error.response.data.message,
        type: 'error',
        duration: 2 * 1000
      });
    }
  })
  return Promise.reject(error)
})

export default service

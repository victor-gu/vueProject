import axios from 'axios'
import { Toast } from 'vant'
import store from '../store'
import { getToken, setToken, setExpiration } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 60000 // 请求60秒超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  Toast.loading({ duration: 0, mask: true, message: '加载中...' })
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
  Toast.clear();
  if (response.status !== 200) {
    return Promise.reject('error')
  } else {
    if (response.headers.expiration) setExpiration(response.headers.expiration)
    if (response.headers.authorization) {
      setToken(response.headers.authorization);
      store.dispatch('SetToken', response.headers.authorization);
    }
    return response.data
  }
}, error => {
  Toast.clear();
  if (!error.response) {
    Toast('请检查网络状态！！！');
  } else if (error.response.status === 400) {
    Toast(error.response.data.message);
  }
  return Promise.reject(error)
})

export default service

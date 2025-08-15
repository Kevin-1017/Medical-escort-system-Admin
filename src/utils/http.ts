import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router'
import { useHeaderStore, useUserStore, useMenuStore } from '@/stores'

const userStore = useUserStore()
const headerStore = useHeaderStore()
const menuStore = useMenuStore()

//创建axios实例
const http = axios.create({
  // 教程接口地址前缀
  // baseURL: 'https:/v3pz.itndedu.com/v3pz',
  // 本地nest.js接口地址
  baseURL: '/api',
  timeout: 10000, // 超时时间
})

// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    // 不需要添加token的api
    const whiteUrl = ['/login']
    const token = localStorage.getItem('a_token')
    if (token && config.url && !whiteUrl.includes(config.url)) {
      config.headers['a_token'] = token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

// 添加响应拦截器
http.interceptors.response.use(
  // 这里是处理成功之后，接口的响应体
  function (response) {
    return response.data
  },
  // 这里是处理错误之后，接口的错误响应，
  function (error) {
    console.log('error错误', error)
    if (error.response.data.code === 777) {
      ElMessage.error(error.response.data.message)
    } else {
      ElMessage.error('非业务错误，检查网络')
    }
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('a_token')
      headerStore.reset()
      userStore.reset()
      menuStore.reset()
      router.push('/login')
    }
    return Promise.reject(error)
  },
)

export default http

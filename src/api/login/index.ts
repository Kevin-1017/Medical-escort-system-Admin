import http from '@/utils/http'

// 登录
export const login = (data: any) => {
  return http.post('/auth/login', data)
}

// 注册
export const register = (data: any) => {
  return http.post('/auth/register', data)
}

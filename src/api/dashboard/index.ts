import http from '@/utils/http'

// 控制台接口
export const getControlData = () => {
  return http.get('/dashboard')
}

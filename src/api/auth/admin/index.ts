import http from '@/utils/http'

// 获取账号列表总数据
export const authAdmin = (params = {}) => {
  return http.get('/users/list', { params })
}

// 角色权限
export const menuSelectList = () => {
  return http.get('/role/selectlist')
}

// 用户信息修改
export const updateAuth = (data: any) => {
  return http.post('/update/user', data)
}

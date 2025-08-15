import http from '@/utils/http'

// 获取账号列表总数据
export const authAdmin = (params = {}) => {
  return http.get('/users/list', { params })
}

// 编辑用户
export const updateAuth = (id: number, params: any) => {
  return http.put(`/users/update/${id}`, params)
}

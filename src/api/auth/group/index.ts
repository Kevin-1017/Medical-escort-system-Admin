import http from '@/utils/http'

// 获取角色数据
export const getRoleList = (params: any) => {
  return http.get('/role', { params })
}

// 更新角色菜单权限
export const updateRole = (data: any) => {
  return http.post('/role/update', data)
}

// 新增角色菜单权限
export const createRole = (data: any) => {
  return http.post('/role/create', data)
}

// 删除角色权限
export const deleteRole = (id: string) => {
  return http.delete(`/role/delete/${id}`)
}

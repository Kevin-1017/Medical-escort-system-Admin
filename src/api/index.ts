import http from '@/utils/http'

// 获取菜单数据
export const getMenuList = () => {
  return http.get('/menu/getMenu')
}
// 根据角色名获取对应菜单
export const getMenuByName = (params: any) => {
  return http.get('/role/getRolePermissionsByName', { params })
}
// 往下未使用
// 发送验证码
export const getCode = (data: any) => {
  return http.post('/get/code', data)
}

// 验证码验证
export const authentication = (data: any) => {
  return http.post('/user/authentication', data)
}

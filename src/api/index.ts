import http from '@/utils/http'

// 获取菜单数据
export const getMenuList = () => {
  return http.get('/menu/getMenu')
}
// 根据角色名获取对应菜单
export const getMenuByName = (params: any) => {
  return http.get('/role/getRolePermissionsByName', { params })
}

// 发送验证码
export const getCode = (data: any) => {
  return http.post('/get/code', data)
}

// 验证码验证
export const authentication = (data: any) => {
  return http.post('/user/authentication', data)
}

// 获取头像
export const photoList = () => {
  return http.get('/photo/list')
}

// 陪护师
export const companion = (data: any) => {
  return http.post('/companion', data)
}

// 陪护师列表
export const companionList = (params: any) => {
  return http.get('/companion/list', { params })
}

// 删除陪护师
export const deleteCompanion = (data: any) => {
  return http.post('/delete/companion', data)
}

// 订单列表

export const adminOrder = (params: any) => {
  return http.get('/admin/order', { params })
}

// 修改订单

export const updateOrder = (data: any) => {
  return http.post('/update/order', data)
}

// 菜单权限,有修改
export const menuPermissions = () => {
  return http.get('/menu/permissions', {})
}

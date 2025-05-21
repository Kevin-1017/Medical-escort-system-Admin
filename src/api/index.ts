import http from '@/utils/http'

// 发送验证码
export const getCode = (data: any) => {
  return http.post('/get/code', data)
}

// 验证码验证
export const authentication = (data: any) => {
  return http.post('/user/authentication', data)
}

// 登录
export const login = (data: any) => {
  return http.post('/login', data)
}

// 账号管理
export const authAdmin = (params = {}) => {
  return http.get('/auth/admin', { params })
}

// 控制台接口
export const getControlData = (params = {}) => {
  return http.get('/report', { params })
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

// 获取菜单权限
export const userGetMenu = () => {
  return http.get('/user/getmenu')
}

// 创建菜单权限
export const userSetmenu = (data: any) => {
  return http.post('/user/setmenu', data)
}

// 菜单列表数据
export const menuList = (params: any) => {
  return http.get('/menu/list', { params })
}

// 菜单权限下拉列表
export const menuSelectList = () => {
  return http.get('/menu/selectlist')
}

// 用户信息修改
export const updateAuth = (data: any) => {
  return http.post('/update/user', data)
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

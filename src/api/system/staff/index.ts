import http from '@/utils/http'

// 陪护师列表
export const companionList = (params: any) => {
  return http.get('/companion/list', { params })
}

// 陪护师新增或编辑
export const companion = (data: any) => {
  return http.post('/companion/save', data)
}
// 陪护师删除
export const deleteCompanion = (data: any) => {
  return http.post('/companion/delete', data)
}
// 获取头像
export const photoList = () => {
  return http.get('/photo/list')
}

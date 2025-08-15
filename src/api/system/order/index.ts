import http from '@/utils/http'

// 订单列表
export const getOrderList = (params: any) => {
  return http.get('/order/list', { params })
}

// 订单修改
export const updateOrder = (data: any) => {
  return http.post('/order/update', data)
}

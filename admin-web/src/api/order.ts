import client from './client';
import type {
  Order,
  OrderPageQuery,
  OrderStatus,
  PageResult,
} from '../types/api';

// 订单分页列表
export function fetchOrderPage(params: OrderPageQuery) {
  return client.get<unknown, PageResult<Order>>('/order/page', {
    params,
  });
}

// 订单详情
export function fetchOrderDetail(id: number) {
  return client.get<unknown, Order>(`/order/${id}`);
}

// 更新订单状态
export function updateOrderStatus(id: number, status: OrderStatus) {
  return client.put<unknown, null>(`/order/${id}/status`, {
    status,
  });
}

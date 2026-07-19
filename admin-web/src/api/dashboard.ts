import client from './client';
import type {
  DashboardSummary,
  SalesTrendItem,
  TopProductItem,
} from '../types/api';

// 仪表盘汇总数据
export function fetchDashboardSummary() {
  return client.get<unknown, DashboardSummary>('/dashboard/summary');
}

// 销售趋势（最近 N 天）
export function fetchSalesTrend(days = 7) {
  return client.get<unknown, SalesTrendItem[]>('/dashboard/sales-trend', {
    params: { days },
  });
}

// 热销商品 TOP N
export function fetchTopProducts(limit = 5) {
  return client.get<unknown, TopProductItem[]>('/dashboard/top-products', {
    params: { limit },
  });
}

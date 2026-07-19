import client from './client';
import type {
  PageResult,
  Product,
  ProductPageQuery,
  ProductPayload,
} from '../types/api';

// 商品分页列表
export function fetchProductPage(params: ProductPageQuery) {
  return client.get<unknown, PageResult<Product>>('/product/page', {
    params,
  });
}

// 商品详情
export function fetchProductDetail(id: number) {
  return client.get<unknown, Product>(`/product/${id}`);
}

// 新增商品
export function createProduct(payload: ProductPayload) {
  return client.post<unknown, Product>('/product', payload);
}

// 更新商品
export function updateProduct(id: number, payload: ProductPayload) {
  return client.put<unknown, Product>(`/product/${id}`, payload);
}

// 删除商品
export function deleteProduct(id: number) {
  return client.delete<unknown, null>(`/product/${id}`);
}

// 商品上下架
export function updateProductStatus(id: number, status: number) {
  return client.put<unknown, null>(`/product/${id}/status`, undefined, {
    params: { status },
  });
}

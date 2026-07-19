import client from './client';
import type { Category, CategoryPayload } from '../types/api';

// 分类列表（全部）
export function fetchCategoryList() {
  return client.get<unknown, Category[]>('/category/list');
}

// 新增分类
export function createCategory(payload: CategoryPayload) {
  return client.post<unknown, Category>('/category', payload);
}

// 更新分类
export function updateCategory(id: number, payload: CategoryPayload) {
  return client.put<unknown, Category>(`/category/${id}`, payload);
}

// 删除分类
export function deleteCategory(id: number) {
  return client.delete<unknown, null>(`/category/${id}`);
}

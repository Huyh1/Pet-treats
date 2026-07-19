import client from './client';
import type {
  Admin,
  ChangePasswordPayload,
  LoginResult,
} from '../types/api';

// 登录
export function login(username: string, password: string) {
  return client.post<unknown, LoginResult>('/admin/login', {
    username,
    password,
  });
}

// 获取当前管理员
export function fetchMe() {
  return client.get<unknown, Admin>('/admin/me');
}

// 修改密码
export function changePassword(payload: ChangePasswordPayload) {
  return client.put<unknown, null>('/admin/password', payload);
}

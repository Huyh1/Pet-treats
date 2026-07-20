import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { message as antdMessage } from 'antd';
import { useAuthStore } from '../store/auth';
import type { ApiResult } from '../types/api';

// axios 实例
const client = axios.create({
  baseURL: '/api',
  timeout: 15000,
});

// 请求拦截：附加 token
client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 成功业务码：兼容 0 和 200（新旧 R.java 均可）
const SUCCESS_CODES = new Set([0, 200]);

// 响应拦截：统一处理业务码与 401
client.interceptors.response.use(
  (response: AxiosResponse<ApiResult>) => {
    const result = response.data;
    // 二进制流等非标准结构直接放行
    if (!result || typeof result.code !== 'number') {
      return response as unknown as AxiosResponse;
    }
    if (SUCCESS_CODES.has(result.code)) {
      return result.data as unknown as AxiosResponse;
    }
    // 业务错误
    antdMessage.error(result.msg || '请求失败');
    return Promise.reject(new Error(result.msg || '请求失败'));
  },
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      // 鉴权失败：清空登录态并跳转登录页
      useAuthStore.getState().clear();
      antdMessage.error('登录已过期，请重新登录');
      // 避免在登录页重复跳转
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    } else {
      const msg = error?.response?.data?.msg || error.message || '网络异常';
      antdMessage.error(msg);
    }
    return Promise.reject(error);
  },
);

export default client;

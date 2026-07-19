import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Admin } from '../types/api';

interface AuthState {
  token: string | null;
  admin: Admin | null;
  setAuth: (token: string, admin: Admin) => void;
  clear: () => void;
  isAuthenticated: () => boolean;
}

// 鉴权状态管理（持久化到 localStorage）
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      admin: null,
      setAuth: (token, admin) => set({ token, admin }),
      clear: () => set({ token: null, admin: null }),
      isAuthenticated: () => !!get().token,
    }),
    {
      name: 'admin-auth',
      // 仅持久化 token 和 admin 信息
      partialize: (state) => ({ token: state.token, admin: state.admin }),
    },
  ),
);

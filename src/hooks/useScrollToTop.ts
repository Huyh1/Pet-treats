import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 路由切换时自动滚回顶部
 */
export function useScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
}

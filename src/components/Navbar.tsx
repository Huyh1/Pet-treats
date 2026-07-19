import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';
import { PawIcon } from './illustrations';

const navItems = [
  { to: '/', label: '首页' },
  { to: '/products', label: '全部商品' },
  { to: '/products?series=dog', label: '犬用' },
  { to: '/products?series=cat', label: '猫用' },
  { to: '/products?series=functional', label: '功能型' },
  { to: '/story', label: '品牌故事' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const location = useLocation();
  const cartCount = useCartStore((s) => s.items.reduce((a, i) => a + i.quantity, 0));

  useEffect(() => {
    setCount(cartCount);
  }, [cartCount]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-cream/85 shadow-soft backdrop-blur-md'
            : 'bg-transparent'
        )}
      >
        <div className="container-edit flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-cocoa text-cream-50 transition-transform duration-500 group-hover:rotate-12">
              <PawIcon className="h-4 w-4" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-medium text-cocoa">毛茸手作</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cocoa/50">
                Furou · Handcraft
              </span>
            </span>
          </Link>

          {/* 桌面导航 */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'link-underline font-mono text-xs uppercase tracking-widest transition-colors',
                    isActive ? 'text-cocoa' : 'text-cocoa/60 hover:text-cocoa'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* 右侧操作 */}
          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-cocoa/15 bg-cream-50/50 text-cocoa transition-all hover:border-cocoa hover:shadow-soft"
              aria-label="购物车"
            >
              <ShoppingBag className="h-4 w-4" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ember px-1 font-mono text-[10px] font-bold text-cream-50"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-cocoa/15 bg-cream-50/50 text-cocoa transition-all hover:border-cocoa lg:hidden"
              aria-label="打开菜单"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 移动端抽屉 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-cocoa/30 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="absolute right-0 top-0 flex h-full w-[78%] max-w-sm flex-col bg-cream p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-xl text-cocoa">菜单</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-cocoa/15"
                  aria-label="关闭"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      to={item.to}
                      className="block border-b border-cocoa/10 py-4 font-display text-2xl text-cocoa"
                    >
                      <span className="mr-3 font-mono text-xs text-cocoa/40">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto pt-6">
                <p className="font-hand text-2xl text-ember">毛茸茸的小确幸</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-cocoa/40">
                  Made with care · Since 2019
                </p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

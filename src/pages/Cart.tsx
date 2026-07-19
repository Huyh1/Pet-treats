import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Minus, Plus, ShoppingBag, Tag, Trash2, X } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import { useCartStore } from '@/store/cartStore';
import { formatCNY } from '@/utils/format';
import { BoneIcon, PawIcon } from '@/components/illustrations';

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const setQty = useCartStore((s) => s.setQty);
  const remove = useCartStore((s) => s.remove);
  const coupon = useCartStore((s) => s.coupon);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);
  const subtotal = useCartStore((s) => s.subtotal());
  const discount = useCartStore((s) => s.discount());
  const shipping = useCartStore((s) => s.shipping());
  const total = useCartStore((s) => s.total());

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [ordered, setOrdered] = useState(false);

  const handleApply = () => {
    setError('');
    if (!code.trim()) return;
    if (!applyCoupon(code)) {
      setError('优惠码无效，试试 WELCOME10');
    }
    setCode('');
  };

  const handleCheckout = () => {
    setOrdered(true);
  };

  if (ordered) {
    return (
      <div className="container-edit pt-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-2xl rounded-3xl bg-cream-50 p-12 text-center shadow-soft"
        >
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-moss text-cream-50">
            <Check className="h-7 w-7" />
          </div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
            Order Confirmed
          </p>
          <h1 className="font-display text-display text-cocoa">
            订单已收到，
            <br />
            <span className="italic text-ember">谢谢你的信任</span>。
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-cocoa/70">
            我们将手工打包，预计 1-2 个工作日内寄出。包裹到达时，
            请开箱检查每一份零食的状态。
          </p>
          <p className="mt-4 font-hand text-2xl text-ember">
            毛茸茸的小确幸，正在路上。
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/products" className="btn-primary">
              继续逛逛
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/" className="btn-ghost">返回首页</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-edit pt-32 md:pt-40">
        <Breadcrumb
          items={[{ label: '首页', to: '/' }, { label: '购物车' }]}
        />
        <div className="grid place-items-center py-20 text-center">
          <PawIcon className="mb-5 h-16 w-16 text-cocoa/15" />
          <h1 className="font-display text-display text-cocoa">
            购物车<span className="italic text-ember">空空如也</span>
          </h1>
          <p className="mt-4 max-w-sm text-sm text-cocoa/60">
            还没有为毛茸茸的小家人挑点什么吗？
            不如从一份手作鸡胸肉条开始。
          </p>
          <Link to="/products" className="btn-primary mt-8">
            逛逛精选
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-edit pt-28 md:pt-36">
      <Breadcrumb
        items={[{ label: '首页', to: '/' }, { label: '购物车' }]}
      />
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
            Cart · {items.length} 件
          </p>
          <h1 className="font-display text-display text-cocoa">
            给<span className="italic text-ember">毛茸茸</span>的，
            <br className="hidden md:block" />
            就在这里。
          </h1>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* 商品清单 */}
        <div className="lg:col-span-7">
          <div className="border-t border-cocoa/10">
            {items.map((item, i) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex gap-4 border-b border-cocoa/10 py-5"
              >
                <Link
                  to={`/products/${item.productId}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-cream-200"
                >
                  <img
                    src={item.snapshot.image}
                    alt={item.snapshot.name}
                    className="h-full w-full object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-2">
                    <div>
                      <Link
                        to={`/products/${item.productId}`}
                        className="font-display text-lg text-cocoa hover:text-ember"
                      >
                        {item.snapshot.name}
                      </Link>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
                        {item.snapshot.weight}
                      </p>
                    </div>
                    <button
                      onClick={() => remove(item.productId)}
                      className="grid h-8 w-8 place-items-center rounded-full text-cocoa/40 transition-colors hover:bg-ember/10 hover:text-ember"
                      aria-label="删除"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-pill border border-cocoa/15 bg-cream-50 p-0.5">
                      <button
                        onClick={() => setQty(item.productId, item.quantity - 1)}
                        className="grid h-8 w-8 place-items-center rounded-full text-cocoa transition-colors hover:bg-cocoa hover:text-cream-50"
                        aria-label="减少"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-10 text-center font-mono text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => setQty(item.productId, item.quantity + 1)}
                        className="grid h-8 w-8 place-items-center rounded-full text-cocoa transition-colors hover:bg-cocoa hover:text-cream-50"
                        aria-label="增加"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-base text-cocoa">
                        {formatCNY(item.snapshot.price * item.quantity)}
                      </div>
                      <div className="font-mono text-[10px] text-cocoa/50">
                        {formatCNY(item.snapshot.price)} × {item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cocoa/60 transition-colors hover:text-cocoa"
          >
            ← 继续选购
          </Link>
        </div>

        {/* 结算卡 */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 rounded-2xl border border-cocoa/10 bg-cream-50 p-7 shadow-soft">
            <h2 className="mb-6 font-display text-2xl text-cocoa">订单摘要</h2>

            {/* 优惠码 */}
            <div className="mb-6 border-y border-cocoa/10 py-5">
              <p className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
                <Tag className="h-3 w-3" />
                优惠码
              </p>
              {coupon ? (
                <div className="flex items-center justify-between rounded-pill bg-moss/10 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-moss" />
                    <span className="font-mono text-sm text-moss-dark">{coupon.code}</span>
                    <span className="text-xs text-cocoa/60">
                      ({Math.round(coupon.discount * 100)}% off)
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="grid h-6 w-6 place-items-center rounded-full text-cocoa/40 hover:bg-cocoa/5 hover:text-cocoa"
                    aria-label="移除优惠码"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="输入优惠码"
                      className="flex-1 rounded-pill border border-cocoa/15 bg-cream px-4 py-2.5 text-sm focus:border-cocoa focus:outline-none"
                    />
                    <button
                      onClick={handleApply}
                      className="rounded-pill bg-cocoa px-5 py-2.5 text-xs font-medium text-cream-50 transition-colors hover:bg-ember"
                    >
                      应用
                    </button>
                  </div>
                  {error && (
                    <p className="mt-2 text-xs text-ember">{error}</p>
                  )}
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-cocoa/40">
                    提示：试试 WELCOME10 / FUROU15 / HANDMADE20
                  </p>
                </>
              )}
            </div>

            {/* 小计 */}
            <div className="space-y-3 text-sm">
              <Row label="商品小计" value={formatCNY(subtotal)} />
              {discount > 0 && (
                <Row
                  label={`优惠（${coupon?.code}）`}
                  value={`-${formatCNY(discount)}`}
                  highlight
                />
              )}
              <Row
                label="运费"
                value={shipping === 0 ? '免运费' : formatCNY(shipping)}
              />
              {shipping > 0 && (
                <p className="font-hand text-base text-ember">
                  再买 {formatCNY(99 - subtotal)} 即可包邮 🐾
                </p>
              )}
            </div>

            <div className="mt-6 flex items-baseline justify-between border-t border-cocoa/10 pt-6">
              <span className="font-display text-xl">合计</span>
              <span className="font-mono text-3xl text-cocoa">{formatCNY(total)}</span>
            </div>

            <button onClick={handleCheckout} className="btn-ember mt-6 w-full">
              <ShoppingBag className="h-4 w-4" />
              去结算
            </button>

            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-cocoa/40">
              · 7 天无理由退换 · 第三方质检 ·
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-cocoa/60">{label}</span>
      <span
        className={`font-mono ${highlight ? 'text-moss-dark' : 'text-cocoa'}`}
      >
        {value}
      </span>
    </div>
  );
}

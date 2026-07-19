import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Minus, Plus, ShoppingBag, TrendingUp } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import RatingStars from '@/components/RatingStars';
import ProductCard from '@/components/ProductCard';
import NotFound from '@/pages/NotFound';
import { getProduct, getReviewsByProduct, getRelatedProducts } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { formatCNY, formatDate } from '@/utils/format';
import { BoneIcon, CircleStamp, LeafIcon, PawIcon } from '@/components/illustrations';

const tagLabels: Record<string, string> = {
  new: '新品',
  bestseller: '畅销',
  hypoallergenic: '低敏',
};

const tagClasses: Record<string, string> = {
  new: 'tag tag-new',
  bestseller: 'tag tag-bestseller',
  hypoallergenic: 'tag tag-hypoallergenic',
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = id ? getProduct(id) : undefined;
  const add = useCartStore((s) => s.add);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return <NotFound />;

  const reviews = getReviewsByProduct(product.id);
  const related = getRelatedProducts(product, 4);

  const handleAdd = () => {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container-edit pt-28 md:pt-36">
      <Breadcrumb
        items={[
          { label: '首页', to: '/' },
          { label: '全部商品', to: '/products' },
          { label: product.name },
        ]}
      />

      <div className="grid gap-12 lg:grid-cols-12">
        {/* 左：图 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream-200">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute left-5 top-5 flex flex-col gap-1.5">
              {product.tags.map((t) => (
                <span key={t} className={tagClasses[t]}>
                  {tagLabels[t]}
                </span>
              ))}
            </div>
            <div className="absolute right-5 top-5">
              <CircleStamp>Batch<br />No.{product.id.slice(0, 4).toUpperCase()}<br />2026</CircleStamp>
            </div>
          </div>

          {/* 缩略图占位 */}
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-lg border border-cocoa/10 bg-cream-200/60"
              >
                <img
                  src={product.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover opacity-60"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* 右：信息 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5"
        >
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
            {product.petType.includes('dog') ? '犬用' : ''}
            {product.petType.includes('cat') && product.petType.includes('dog') ? ' · ' : ''}
            {product.petType.includes('cat') ? '猫用' : ''} · {product.weight}
          </p>
          <h1 className="font-display text-4xl text-cocoa md:text-5xl">{product.name}</h1>
          <p className="mt-3 text-base text-cocoa/70">{product.description}</p>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <RatingStars rating={product.rating} size="md" showValue />
            <span className="font-mono text-xs text-cocoa/50">
              {product.reviewCount} 条评价
            </span>
            <span className="inline-flex items-center gap-1 rounded-pill bg-ember/8 px-3 py-1 font-mono text-xs text-ember-dark">
              <TrendingUp className="h-3 w-3" />
              近 30 天售出 {product.monthlySales.toLocaleString()} 件
            </span>
          </div>

          <div className="mt-7 flex items-end gap-3 border-b border-cocoa/10 pb-7">
            <span className="font-mono text-4xl text-cocoa">{formatCNY(product.price)}</span>
            <span className="mb-1 font-mono text-xs text-cocoa/50">含税 · 满 ¥99 包邮</span>
          </div>

          {/* 数量 + 加购 */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-pill border border-cocoa/15 bg-cream-50 p-1">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-10 w-10 place-items-center rounded-full text-cocoa transition-colors hover:bg-cocoa hover:text-cream-50"
                aria-label="减少数量"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-mono text-base text-cocoa">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="grid h-10 w-10 place-items-center rounded-full text-cocoa transition-colors hover:bg-cocoa hover:text-cream-50"
                aria-label="增加数量"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className={`btn-primary flex-1 ${added ? 'bg-moss' : ''}`}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" /> 已加入
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" /> 加入购物车
                </>
              )}
            </button>
            <Link to="/cart" className="btn-ghost">
              <ArrowRight className="h-4 w-4" />
              立即结算
            </Link>
          </div>

          {/* 原料组成 */}
          <div className="mt-10 border-t border-cocoa/10 pt-8">
            <h2 className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-cocoa/60">
              <LeafIcon className="h-4 w-4 text-moss" />
              原料组成
            </h2>
            <ul className="space-y-2">
              {product.ingredients.map((ing, i) => (
                <li key={i} className="flex items-baseline gap-3 text-sm">
                  <span className="font-mono text-xs text-cocoa/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-cocoa/80">{ing}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-lg bg-cream-200/50 p-3 font-hand text-base text-cocoa/70">
              {product.story}
            </p>
          </div>

          {/* 营养分析 */}
          <div className="mt-8 border-t border-cocoa/10 pt-8">
            <h2 className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-cocoa/60">
              <BoneIcon className="h-4 w-4 text-ember" />
              营养分析
            </h2>
            <table className="w-full border-collapse overflow-hidden rounded-lg">
              <tbody>
                {product.nutrition.map((n, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-cream-200/40' : 'bg-cream-50'}>
                    <td className="px-4 py-3 text-sm text-cocoa/70">{n.label}</td>
                    <td className="px-4 py-3 text-right font-mono text-sm text-cocoa">
                      {n.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 喂食建议 */}
          <div className="mt-8 border-t border-cocoa/10 pt-8">
            <h2 className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-cocoa/60">
              <PawIcon className="h-4 w-4 text-gold" />
              喂食建议
            </h2>
            <p className="text-sm leading-relaxed text-cocoa/80">{product.feeding}</p>
          </div>
        </motion.div>
      </div>

      {/* 用户评价 */}
      <section className="mt-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
              真实评价
            </p>
            <h2 className="font-display text-section text-cocoa">
              来自<span className="italic text-ember">毛茸茸</span>主人
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <RatingStars rating={product.rating} size="md" />
            <span className="font-display text-3xl">{product.rating.toFixed(1)}</span>
          </div>
        </div>

        {reviews.length === 0 ? (
          <p className="rounded-2xl border border-cocoa/10 bg-cream-50 p-10 text-center text-sm text-cocoa/60">
            还没有评价，来当第一个主人吧。
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map((r) => (
              <div key={r.id} className="card-edit p-6">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-full font-display text-lg text-cream-50 ${
                        r.petType === 'dog' ? 'bg-ember' : 'bg-gold'
                      }`}
                    >
                      {r.petName.charAt(0)}
                    </span>
                    <div>
                      <div className="font-display text-base text-cocoa">{r.petName}</div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-cocoa/50">
                        {r.petBreed} · {r.author}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-cocoa/40">
                    {formatDate(r.date)}
                  </span>
                </div>
                <RatingStars rating={r.rating} />
                <p className="mt-3 text-sm leading-relaxed text-cocoa/80">{r.content}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 相关推荐 */}
      {related.length > 0 && (
        <section className="mt-24">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-section text-cocoa">
              可能也<span className="italic text-ember">合心意</span>
            </h2>
            <Link
              to="/products"
              className="link-underline font-mono text-xs uppercase tracking-widest text-cocoa"
            >
              全部商品 →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <Link
        to="/products"
        className="mt-16 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cocoa/60 transition-colors hover:text-cocoa"
      >
        <ArrowLeft className="h-3 w-3" />
        返回商品列表
      </Link>
    </div>
  );
}

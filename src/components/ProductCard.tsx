import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import type { Product } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { formatCNY, formatMonthlySales } from '@/utils/format';
import { BoneIcon, PawIcon, StarIcon } from './illustrations';

interface ProductCardProps {
  product: Product;
  index?: number;
}

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

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const add = useCartStore((s) => s.add);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.3) }}
      className="card-edit group"
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-cream-200">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* 标签层 */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.tags.map((t) => (
              <span key={t} className={tagClasses[t]}>
                {tagLabels[t]}
              </span>
            ))}
          </div>
          {/* 装饰小爪 */}
          <PawIcon className="absolute bottom-3 right-3 h-5 w-5 text-cream-50/70 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </Link>

      <div className="p-5">
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <h3 className="font-display text-xl text-cocoa">{product.name}</h3>
          <div className="flex shrink-0 items-center gap-1 font-mono text-xs text-cocoa/60">
            <StarIcon className="h-3 w-3 text-gold" />
            {product.rating.toFixed(1)}
          </div>
        </div>
        <p className="mb-3 text-xs text-cocoa/60">{product.description}</p>
        <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
          <span>{product.weight}</span>
          <span className="inline-flex items-center gap-1 normal-case tracking-normal text-ember-dark">
            <TrendingUp className="h-3 w-3" />
            月销 {formatMonthlySales(product.monthlySales)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-lg text-cocoa">{formatCNY(product.price)}</span>
          <button
            type="button"
            onClick={() => add(product)}
            className="group/btn inline-flex items-center gap-2 rounded-pill bg-cocoa px-4 py-2 text-xs font-medium text-cream-50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-ember hover:shadow-lift"
            aria-label={`将 ${product.name} 加入购物车`}
          >
            <BoneIcon className="h-3 w-3" />
            加购
          </button>
        </div>
      </div>
    </motion.article>
  );
}

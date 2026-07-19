import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bestsellers = products.filter((p) => p.tags.includes('bestseller')).slice(0, 8);

  const scrollBy = (delta: number) => {
    scrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-cream-200/40 py-24 md:py-32">
      <div className="container-edit">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
              02 · Best Sellers
            </p>
            <h2 className="font-display text-section text-cocoa">
              毛孩子们<span className="italic text-ember">回购最多</span>的
              <br className="hidden md:block" /> 几样东西。
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-400)}
              className="hidden h-10 w-10 place-items-center rounded-full border border-cocoa/15 bg-cream-50 text-cocoa transition-all hover:border-cocoa hover:shadow-soft md:grid"
              aria-label="向左滚动"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(400)}
              className="hidden h-10 w-10 place-items-center rounded-full border border-cocoa/15 bg-cream-50 text-cocoa transition-all hover:border-cocoa hover:shadow-soft md:grid"
              aria-label="向右滚动"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link to="/products" className="btn-ghost">
              查看全部
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 lg:px-10 xl:px-14"
      >
        {bestsellers.map((p, i) => (
          <div
            key={p.id}
            className="w-[78vw] shrink-0 snap-center sm:w-[320px] md:w-[300px] lg:w-[300px]"
          >
            <ProductCard product={p} index={i} />
          </div>
        ))}
        <div className="w-2 shrink-0" aria-hidden />
      </div>
    </section>
  );
}

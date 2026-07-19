import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, TrendingUp } from 'lucide-react';
import { products } from '@/data/products';
import { formatCNY, formatMonthlySales } from '@/utils/format';
import { FlourishDecoration, PawIcon } from '@/components/illustrations';

const TOP_N = 5;

export default function BestSellersChart() {
  const ranked = [...products]
    .sort((a, b) => b.monthlySales - a.monthlySales)
    .slice(0, TOP_N);
  const total = ranked.reduce((s, p) => s + p.monthlySales, 0);
  const maxSales = ranked[0].monthlySales;

  // 排名配色：冠军金色徽章，二三位暖色，其他单色
  const rankStyles: Record<number, { bg: string; text: string; medal?: string }> = {
    1: { bg: 'bg-gold', text: 'text-cocoa', medal: '冠军' },
    2: { bg: 'bg-ember', text: 'text-cream-50', medal: '亚军' },
    3: { bg: 'bg-moss', text: 'text-cream-50', medal: '季军' },
  };

  return (
    <section className="container-edit py-24 md:py-32">
      <div className="mb-14 grid items-end gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
            06 · Monthly Chart
          </p>
          <h2 className="font-display text-section text-cocoa">
            本月<span className="italic text-ember">热销榜</span>
            <br className="hidden md:block" />
            毛茸茸们投票选出的 TOP {TOP_N}。
          </h2>
        </div>
        <div className="md:col-span-5 md:text-right">
          <p className="font-hand text-2xl text-ember">基于近 30 天真实订单</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
            Top {TOP_N} 合计 {total.toLocaleString()} 件 · 数据每日更新
          </p>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* 榜单列表 */}
        <div className="lg:col-span-7">
          <ol className="space-y-2">
            {ranked.map((p, i) => {
              const rank = i + 1;
              const style = rankStyles[rank] || {
                bg: 'bg-cream-200',
                text: 'text-cocoa',
              };
              const widthPct = (p.monthlySales / maxSales) * 100;
              return (
                <motion.li
                  key={p.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link
                    to={`/products/${p.id}`}
                    className="group relative grid grid-cols-[auto_auto_1fr_auto] items-center gap-4 overflow-hidden rounded-2xl border border-cocoa/10 bg-cream-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift md:gap-5 md:p-5"
                  >
                    {/* 排名 */}
                    <div className="relative">
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-full font-display text-2xl ${style.bg} ${style.text} md:h-14 md:w-14 md:text-3xl`}
                      >
                        {String(rank).padStart(2, '0')}
                      </span>
                      {style.medal && (
                        <span className="absolute -right-1 -top-1 rounded-pill bg-cocoa px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-widest text-cream-50">
                          {style.medal}
                        </span>
                      )}
                    </div>

                    {/* 缩略图 */}
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-cream-200 md:h-16 md:w-16">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* 名称 + 销量条 */}
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-lg text-cocoa md:text-xl">
                        {p.name}
                      </h3>
                      <p className="mb-1.5 mt-0.5 font-mono text-[10px] uppercase tracking-widest text-cocoa/50">
                        {p.weight}
                      </p>
                      <div className="h-1.5 w-full overflow-hidden rounded-pill bg-cocoa/8">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${widthPct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.08, ease: 'easeOut' }}
                          className={`h-full rounded-pill ${style.bg}`}
                        />
                      </div>
                    </div>

                    {/* 价格 + 月销 */}
                    <div className="text-right">
                      <div className="font-mono text-base text-cocoa md:text-lg">
                        {formatCNY(p.price)}
                      </div>
                      <div className="mt-1 inline-flex items-center gap-0.5 font-mono text-[10px] text-ember-dark">
                        <TrendingUp className="h-3 w-3" />
                        {formatMonthlySales(p.monthlySales)}
                      </div>
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* 右侧：冠军卡片 */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-cream-50 to-gold/10 p-7 shadow-soft md:p-9">
            <div className="mb-6 flex items-center justify-between">
              <span className="stamp">
                <Crown className="h-3 w-3 text-gold" />
                本月冠军
              </span>
              <FlourishDecoration className="hidden h-5 w-24 text-gold/50 md:block" />
            </div>

            <Link to={`/products/${ranked[0].id}`} className="group block">
              <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={ranked[0].image}
                  alt={ranked[0].name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa/40 to-transparent" />
                <div className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-gold text-cocoa shadow-lift">
                  <Crown className="h-5 w-5" />
                </div>
              </div>

              <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
                No.1 Best Seller
              </p>
              <h3 className="font-display text-3xl text-cocoa md:text-4xl">
                {ranked[0].name}
              </h3>
              <p className="mt-2 text-sm text-cocoa/70">{ranked[0].description}</p>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-mono text-3xl text-cocoa">
                  {formatCNY(ranked[0].price)}
                </span>
                <span className="font-mono text-xs text-cocoa/50">{ranked[0].weight}</span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-cocoa/10 pt-5">
                <Stat label="月销" value={`${formatMonthlySales(ranked[0].monthlySales)}`} />
                <Stat label="评分" value={ranked[0].rating.toFixed(1)} />
                <Stat label="评价" value={`${ranked[0].reviewCount}`} />
              </div>

              <div className="mt-6 flex items-center justify-between rounded-pill bg-cocoa px-5 py-3 text-cream-50">
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
                  <PawIcon className="h-4 w-4" />
                  去看看冠军
                </span>
                <TrendingUp className="h-4 w-4 text-gold" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-display text-xl text-cocoa md:text-2xl">{value}</div>
      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-cocoa/50">
        {label}
      </div>
    </div>
  );
}

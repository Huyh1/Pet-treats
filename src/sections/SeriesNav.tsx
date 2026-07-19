import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { BoneIcon, FishBoneIcon, LeafIcon } from '@/components/illustrations';

const series = [
  {
    key: 'dog',
    title: '犬用',
    en: 'For Dogs',
    desc: '风干肉条 · 训练粒 · 啃咬骨',
    image:
      'https://picsum.photos/seed/furou-series-dog-golden-retriever/800/1000',
    accent: 'text-ember',
    Icon: BoneIcon,
    to: '/products?series=dog',
  },
  {
    key: 'cat',
    title: '猫用',
    en: 'For Cats',
    desc: '鱼粒 · 慕斯 · 拌粮丝',
    image:
      'https://picsum.photos/seed/furou-series-cat-salmon/800/1000',
    accent: 'text-gold',
    Icon: FishBoneIcon,
    to: '/products?series=cat',
  },
  {
    key: 'functional',
    title: '功能型',
    en: 'Functional',
    desc: '低敏配方 · 洁齿 · 补水',
    image:
      'https://picsum.photos/seed/furou-series-functional-herbs/800/1000',
    accent: 'text-moss',
    Icon: LeafIcon,
    to: '/products?series=functional',
  },
];

export default function SeriesNav() {
  return (
    <section className="container-edit py-24 md:py-32">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
            01 · Series
          </p>
          <h2 className="font-display text-section text-cocoa">
            三条<span className="italic text-ember">线索</span>，
            <br className="hidden md:block" />
            一种手作态度。
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-cocoa/60">
          每一系列都遵循同一条原则：原料透明、配方克制。
          没有花哨的诱食剂，只有真实食材本身的味道。
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {series.map((s, i) => {
          const Icon = s.Icon;
          return (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
            >
              <Link
                to={s.to}
                className="group block overflow-hidden rounded-2xl border border-cocoa/10 bg-cream-50 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cocoa/70 via-cocoa/10 to-transparent" />
                  <div className={`absolute left-5 top-5 ${s.accent}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="absolute inset-x-5 bottom-5 text-cream-50">
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-widest opacity-70">
                      {s.en}
                    </p>
                    <h3 className="font-display text-3xl">{s.title}</h3>
                    <p className="mt-1 text-xs opacity-80">{s.desc}</p>
                  </div>
                  <div className="absolute right-4 top-4 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-cream-50 text-cocoa opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

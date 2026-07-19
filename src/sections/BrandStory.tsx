import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CircleStamp } from '@/components/illustrations';

const stats = [
  { value: '100%', label: '真实可食肉源' },
  { value: '0', label: '诱食剂 / 防腐剂' },
  { value: '18h', label: '低温风干时间' },
  { value: '7', label: '追溯环节透明' },
];

export default function BrandStory() {
  return (
    <section className="container-edit py-24 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-12">
        {/* 左侧大图 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative md:col-span-5"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <img
              src="https://picsum.photos/seed/furou-brand-story-kitchen-hands/800/1000"
              alt="手作厨房"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -right-4 -top-4 md:-right-6 md:-top-6">
            <CircleStamp>Est.<br />2019<br />Shanghai</CircleStamp>
          </div>
          <div className="absolute -bottom-6 left-6 max-w-[180px] rounded-xl bg-cream-50 p-4 shadow-lift md:left-1/4">
            <p className="font-hand text-xl text-ember">少即是多</p>
            <p className="mt-1 text-[11px] leading-snug text-cocoa/60">
              Less is more. 单一原料，慢工细作。
            </p>
          </div>
        </motion.div>

        {/* 右侧文字 */}
        <div className="md:col-span-7 md:pl-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-3 font-mono text-[11px] uppercase tracking-widest text-cocoa/50"
          >
            03 · Our Story
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-display text-cocoa"
          >
            因为<span className="italic text-ember">看不懂</span>
            <br />
            配料表，
            <br />
            所以自己写一份。
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 space-y-5 text-base leading-relaxed text-cocoa/70"
          >
            <p>
              2019 年，毛茸主理人捡回一只流浪橘猫。逛了一圈宠物店，发现货架上的零食配料表
              像化学课本。她决定从厨房开始，用自己的方式做给自家猫吃。
            </p>
            <p>
              七年过去，这个厨房变成了一个小工作室。我们坚持：
              <span className="font-medium text-cocoa"> 单一原料来源、低温慢做、配方克制</span>。
              每一份零食都能追溯到具体的农场、批次与制作日期。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-cocoa/10 py-7 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl text-ember md:text-4xl">{s.value}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-cocoa/50">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8"
          >
            <Link to="/story" className="btn-primary group">
              读完整故事
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

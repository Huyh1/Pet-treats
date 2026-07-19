import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { BoneIcon, CircleStamp, FlourishDecoration, PawIcon } from '@/components/illustrations';

export default function Hero() {
  return (
    <section className="relative -mt-16 min-h-[100svh] overflow-hidden pt-16 md:-mt-20 md:pt-20">
      {/* 背景图 */}
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/seed/furou-hero-workshop-warm-kitchen/1600/900"
          alt="毛茸手作厨房"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-cream/20 to-cream" />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/60 via-transparent to-cream/30" />
      </div>

      <div className="container-edit relative z-10 flex min-h-[calc(100svh-4rem)] flex-col justify-between py-12 md:py-16">
        {/* 顶部邮戳 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-start justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="stamp">Vol. 07 · Summer 2026</span>
            <span className="hidden font-mono text-[11px] uppercase tracking-widest text-cocoa/50 md:inline">
              Handcraft Issue
            </span>
          </div>
          <div className="hidden md:block">
            <CircleStamp>Single<br />Source<br />Protein</CircleStamp>
          </div>
        </motion.div>

        {/* 标题主区 */}
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-5 flex items-center gap-3 text-cocoa/60"
          >
            <PawIcon className="h-5 w-5 text-ember" />
            <span className="font-mono text-xs uppercase tracking-[0.3em]">
              给毛茸茸的家人 · 一份手作的心
            </span>
            <PawIcon className="h-5 w-5 text-ember" />
          </motion.div>

          <h1 className="font-display text-hero font-light text-cocoa">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="block italic"
            >
              像做菜
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="block"
            >
              一样做
              <span className="relative ml-2 inline-block">
                <span className="relative z-10 text-ember">零食</span>
                <span className="absolute inset-x-0 bottom-2 z-0 h-3 -rotate-1 bg-gold/30" />
              </span>
              。
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-cocoa/70 md:text-lg"
          >
            手作式宠物零食工作室。单一原料、低温慢做、可追溯。
            每一份零食都像为家人做菜，少即是多。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link to="/products" className="btn-ember group">
              逛逛精选
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link to="/story" className="btn-ghost">
              我们的故事
            </Link>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
              <BoneIcon className="h-3 w-8" />
              满 ¥99 包邮 · 7 天无理由
            </div>
          </motion.div>
        </div>

        {/* 底部 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-12 flex items-end justify-between"
        >
          <FlourishDecoration className="hidden h-8 w-40 text-cocoa/40 md:block" />
          <div className="flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cocoa/40">
            <span>向下探索</span>
            <ArrowDown className="h-3 w-3 animate-bounce" />
          </div>
          <div className="hidden text-right md:block">
            <p className="font-display text-2xl italic text-cocoa">No.07</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-cocoa/40">
              Summer · 2026
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

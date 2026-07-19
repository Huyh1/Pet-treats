import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import { CircleStamp, FlourishDecoration, PawIcon } from '@/components/illustrations';

const chapters = [
  {
    n: '01',
    year: '2019',
    title: '一只橘猫，和一个厨房',
    body: '毛茸的故事从一只在小区捡到的流浪橘猫开始。主理人逛遍宠物店，发现货架上的零食配料表像化学课本——她决定回到厨房，用自己的方式做给自家猫吃。',
    image:
      'https://picsum.photos/seed/furou-story-orange-cat-kitchen/800/600',
  },
  {
    n: '02',
    year: '2021',
    title: '从厨房到工作室',
    body: '认识越来越多想要"看懂配料表"的主人，毛茸从家庭厨房搬到了上海长宁的工作室。我们坚持单一原料来源、低温慢做、配方克制。每一份零食都能追溯到具体的农场与批次。',
    image:
      'https://picsum.photos/seed/furou-story-artisan-workshop/800/600',
  },
  {
    n: '03',
    year: '2024',
    title: '冻干车间，与新的可能',
    body: '我们引入了冻干设备，让单一原料的营养保留率超过 95%。兔肉、羊肺等低敏蛋白逐渐加入产品线。我们也开始每月公开一次的"开放日"，邀请主人来工作室看制作过程。',
    image:
      'https://picsum.photos/seed/furou-story-freeze-drying-workshop/800/600',
  },
];

const values = [
  {
    title: '单一原料',
    desc: '每款零食的核心原料不超过三种，单一蛋白源让易敏宠物更安心。',
  },
  {
    title: '低温慢做',
    desc: '风干 18 小时或冻干 36 小时，温度不超过 60℃，保留营养与风味。',
  },
  {
    title: '透明溯源',
    desc: '每袋零食附批次号，可查具体原料产地、检测报告与制作日期。',
  },
  {
    title: '克制配方',
    desc: '没有诱食剂、防腐剂、色素。少即是多，是我们的厨房准则。',
  },
];

export default function Story() {
  return (
    <div className="container-edit pt-28 md:pt-36">
      <Breadcrumb
        items={[{ label: '首页', to: '/' }, { label: '品牌故事' }]}
      />

      {/* Hero */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <img
            src="https://picsum.photos/seed/furou-story-hero-hands-kneading/1600/900"
            alt="毛茸手作"
            className="h-[40vh] min-h-[280px] w-full object-cover md:h-[60vh]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa/80 via-cocoa/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 md:p-14">
            <div className="max-w-3xl">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-cream-50/60">
                Our Story · Since 2019
              </p>
              <h1 className="font-display text-hero text-cream-50">
                <span className="italic">厨房</span>，
                <br />
                是我们做零食的<span className="text-ember-light">起点</span>。
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-cream-50/80 md:text-base">
                不是工厂，不是流水线。是一个相信"少即是多"的小工作室，
                用家人做菜的方式，给毛茸茸的小家伙做零食。
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 章节 */}
      <section className="space-y-24 md:space-y-32">
        {chapters.map((c, i) => (
          <motion.div
            key={c.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="grid items-center gap-10 md:grid-cols-12"
          >
            <div className={`md:col-span-7 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
            <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
              <div className="mb-4 flex items-baseline gap-4">
                <span className="font-display text-6xl text-ember/30">{c.n}</span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
                    Chapter
                  </p>
                  <p className="font-display text-2xl text-cocoa">{c.year}</p>
                </div>
              </div>
              <h2 className="font-display text-section text-cocoa">{c.title}</h2>
              <p className="mt-5 text-base leading-relaxed text-cocoa/70">{c.body}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 品牌价值观 */}
      <section className="mt-32">
        <div className="mb-14 text-center">
          <FlourishDecoration className="mx-auto mb-5 h-8 w-40 text-cocoa/40" />
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
            What We Believe
          </p>
          <h2 className="font-display text-display text-cocoa">
            四件<span className="italic text-ember">不会变</span>的事
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-edit p-7"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-2xl text-cocoa">{v.title}</h3>
                <PawIcon className="h-6 w-6 text-ember/40" />
              </div>
              <p className="text-sm leading-relaxed text-cocoa/70">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 引文 */}
      <section className="mt-32">
        <div className="relative overflow-hidden rounded-3xl bg-cocoa px-7 py-20 text-center text-cream-50 md:px-16 md:py-32">
          <PawIcon className="absolute -left-10 top-10 h-48 w-48 text-cream-50/5" />
          <PawIcon className="absolute -right-5 bottom-0 h-32 w-32 rotate-12 text-cream-50/5" />
          <CircleStamp className="mx-auto mb-8">
            Furou<br />Handcraft
          </CircleStamp>
          <p className="mx-auto max-w-3xl font-display text-3xl leading-relaxed md:text-4xl">
            "做零食这件事，
            <span className="italic text-ember-light">不需要复杂</span>，
            <br />
            只需要<span className="italic text-ember-light">认真</span>。"
          </p>
          <p className="mt-8 font-hand text-2xl text-cream-50/60">— 毛茸手作主理人</p>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 text-center">
        <h2 className="font-display text-section text-cocoa">
          想给毛茸茸的家人
          <span className="italic text-ember"> 挑点什么</span>？
        </h2>
        <Link to="/products" className="btn-primary mx-auto mt-8 inline-flex">
          逛逛精选
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}

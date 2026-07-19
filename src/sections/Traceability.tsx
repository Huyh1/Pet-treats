import { motion } from 'framer-motion';
import { BoneIcon, FishBoneIcon, LeafIcon, PawIcon } from '@/components/illustrations';

const steps = [
  {
    n: '01',
    title: '原料到店',
    desc: '山东单源鸡胸、新西兰草饲牛肝、北大西洋三文鱼。每批原料均附检疫与产地证明。',
    Icon: LeafIcon,
  },
  {
    n: '02',
    title: '清洗分切',
    desc: '人工剔筋去膜，按形状分切。无任何预处理剂，仅用清水冲洗。',
    Icon: PawIcon,
  },
  {
    n: '03',
    title: '低温慢做',
    desc: '风干 18 小时或冻干 36 小时，温度不超过 60℃，最大程度保留营养与风味。',
    Icon: BoneIcon,
  },
  {
    n: '04',
    title: '质检封装',
    desc: '每批送第三方检测，附检测报告。手工封装并打上生产日期与批号。',
    Icon: FishBoneIcon,
  },
];

export default function Traceability() {
  return (
    <section className="relative overflow-hidden bg-cocoa py-24 text-cream-50 md:py-32">
      {/* 背景纹理 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q25 25 50 50 T100 50' stroke='%23F4EDE0' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3C/svg%3E\")",
          backgroundSize: '120px 60px',
        }}
      />
      <div className="container-edit relative z-10">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-cream-50/40">
            04 · Traceability
          </p>
          <h2 className="font-display text-section">
            每一袋都能
            <span className="italic text-ember-light"> 回答四个问题</span>：
            <br />
            它从哪里来，由谁做的，怎么做，何时做完。
          </h2>
        </div>

        {/* 时间轴 */}
        <div className="relative grid gap-8 md:grid-cols-4">
          {/* 横线 */}
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-cream-50/15 md:block" />
          {steps.map((step, i) => {
            const Icon = step.Icon;
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative"
              >
                <div className="relative z-10 mb-6 flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-cream-50 text-cocoa">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-4xl text-cream-50/30">{step.n}</span>
                </div>
                <h3 className="mb-2 font-display text-2xl">{step.title}</h3>
                <p className="text-sm leading-relaxed text-cream-50/60">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-cream-50/10 pt-8"
        >
          <p className="font-hand text-2xl text-ember-light">
            扫码即见，从农场到尾巴。
          </p>
          <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-widest text-cream-50/40">
            <span>SGS 检测</span>
            <span>·</span>
            <span>批号追溯</span>
            <span>·</span>
            <span>14 天质保</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

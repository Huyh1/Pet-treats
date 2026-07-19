import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { BoneIcon, PawIcon } from '@/components/illustrations';

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section className="container-edit pb-8">
      <div className="relative overflow-hidden rounded-3xl bg-cocoa px-7 py-16 text-cream-50 md:px-16 md:py-24">
        {/* 装饰 */}
        <PawIcon className="absolute -left-8 top-8 h-40 w-40 text-cream-50/5" />
        <PawIcon className="absolute -right-4 bottom-4 h-24 w-24 rotate-12 text-cream-50/5" />
        <BoneIcon className="absolute right-1/3 top-6 h-5 w-20 text-ember/30" />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-5 font-mono text-[11px] uppercase tracking-widest text-cream-50/50"
          >
            06 · Newsletter
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-display"
          >
            <span className="italic text-ember-light">首单 9 折</span>，
            <br />
            以及每月一封手写小信。
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-cream-50/70"
          >
            新品试吃、季节限定、喂养小知识，以及偶尔的厨房碎碎念。
            没有打扰，只有想给毛孩子更好的。
          </motion.p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto mt-10 flex max-w-md items-center justify-center gap-3 rounded-pill bg-cream-50/10 px-6 py-4"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ember">
                <Check className="h-4 w-4 text-cream-50" />
              </span>
              <span className="text-sm">
                订阅成功！优惠码 <span className="font-mono font-bold text-ember-light">WELCOME10</span> 已发送至你的邮箱。
              </span>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              onSubmit={onSubmit}
              className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 rounded-pill border border-cream-50/20 bg-cream-50/5 px-6 py-3.5 text-sm text-cream-50 placeholder:text-cream-50/40 focus:border-ember focus:outline-none"
              />
              <button type="submit" className="btn-ember group whitespace-nowrap">
                订阅
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.form>
          )}

          <p className="mt-5 font-hand text-base text-cream-50/40">
            随时退订，不打扰是我们最基本的态度。
          </p>
        </div>
      </div>
    </section>
  );
}

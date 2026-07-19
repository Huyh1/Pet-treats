import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import RatingStars from '@/components/RatingStars';
import { reviews } from '@/data/products';
import { formatDate } from '@/utils/format';

const petAvatarColors: Record<string, string> = {
  dog: 'bg-ember',
  cat: 'bg-gold',
};

export default function Reviews() {
  // 取 6 条评价做瀑布流
  const featured = reviews.slice(0, 6);

  return (
    <section className="container-edit py-24 md:py-32">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
            05 · Reviews
          </p>
          <h2 className="font-display text-section text-cocoa">
            <span className="italic text-ember">毛茸茸的</span>
            <br className="hidden md:block" />
            主人们怎么说。
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-display text-4xl text-cocoa">4.9</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-cocoa/50">
              平均评分 · 2,407 条
            </div>
          </div>
        </div>
      </div>

      <div className="columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
        {featured.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            className="card-edit p-6"
          >
            <Quote className="mb-3 h-5 w-5 text-ember/40" />
            <p className="mb-5 text-sm leading-relaxed text-cocoa/80">{r.content}</p>
            <div className="flex items-center justify-between border-t border-cocoa/10 pt-4">
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full ${
                    petAvatarColors[r.petType]
                  } font-display text-lg text-cream-50`}
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
              <div className="text-right">
                <RatingStars rating={r.rating} />
                <div className="mt-1 font-mono text-[10px] text-cocoa/40">
                  {formatDate(r.date)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

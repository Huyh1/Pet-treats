import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin } from 'lucide-react';
import { BoneIcon, FishBoneIcon, PawIcon } from './illustrations';

export default function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-cocoa text-cream-50">
      {/* 顶部装饰 */}
      <div className="flex items-center justify-center gap-6 py-4 text-cream-50/20">
        <BoneIcon className="h-5 w-12" />
        <FishBoneIcon className="h-5 w-16" />
        <PawIcon className="h-6 w-6" />
        <FishBoneIcon className="h-5 w-16" />
        <BoneIcon className="h-5 w-12" />
      </div>

      <div className="container-edit py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* 品牌 */}
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-cream-50 text-cocoa">
                <PawIcon className="h-4 w-4" />
              </span>
              <span className="font-display text-2xl">毛茸手作</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-50/70">
              手作式宠物零食工作室。我们相信给宠物的食物应该像给家人做菜一样：
              单一原料、低温慢做、透明可追溯。
            </p>
            <p className="mt-6 font-hand text-2xl text-ember-light">
              为每一个毛茸茸的家人
            </p>
          </div>

          {/* 链接 */}
          <div className="md:col-span-3">
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-cream-50/40">
              商品
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/products" className="text-cream-50/80 transition-colors hover:text-ember-light">全部商品</Link></li>
              <li><Link to="/products?series=dog" className="text-cream-50/80 transition-colors hover:text-ember-light">犬用零食</Link></li>
              <li><Link to="/products?series=cat" className="text-cream-50/80 transition-colors hover:text-ember-light">猫用零食</Link></li>
              <li><Link to="/products?series=functional" className="text-cream-50/80 transition-colors hover:text-ember-light">功能型</Link></li>
              <li><Link to="/products?tag=hypoallergenic" className="text-cream-50/80 transition-colors hover:text-ember-light">低敏系列</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-cream-50/40">
              关于
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/story" className="text-cream-50/80 transition-colors hover:text-ember-light">品牌故事</Link></li>
              <li><Link to="/story#traceability" className="text-cream-50/80 transition-colors hover:text-ember-light">原料溯源</Link></li>
              <li><a href="#" className="text-cream-50/80 transition-colors hover:text-ember-light">配送说明</a></li>
              <li><a href="#" className="text-cream-50/80 transition-colors hover:text-ember-light">退换政策</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-cream-50/40">
              联系
            </h4>
            <ul className="space-y-3 text-sm text-cream-50/80">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-ember-light" />
                hello@furou.pet
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-ember-light" />
                上海·长宁
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-3.5 w-3.5 text-ember-light" />
                @furou.handcraft
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-cream-50/10 pt-8 text-xs text-cream-50/40 md:flex-row md:items-center md:justify-between">
          <p className="font-mono uppercase tracking-widest">
            © 2026 Furou Handcraft · All rights reserved
          </p>
          <p className="font-hand text-base text-cream-50/60">
            Hand-made in Shanghai · 沪 ICP 备 2019-XXXXX
          </p>
        </div>
      </div>
    </footer>
  );
}

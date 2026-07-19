import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { PawIcon } from '@/components/illustrations';

export default function NotFound() {
  return (
    <div className="container-edit grid min-h-[70vh] place-items-center pt-28 text-center">
      <div>
        <PawIcon className="mx-auto mb-6 h-20 w-20 text-cocoa/15" />
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
          404 · Lost Paws
        </p>
        <h1 className="font-display text-hero text-cocoa">
          这页<span className="italic text-ember">走丢了</span>。
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-cocoa/70">
          好像跟着一只猫跑进了不该跑的角落。
          不如回到首页，重新挑点给毛茸茸的小礼物。
        </p>
        <Link to="/" className="btn-primary mt-8 inline-flex">
          <Home className="h-4 w-4" />
          回到首页
        </Link>
      </div>
    </div>
  );
}

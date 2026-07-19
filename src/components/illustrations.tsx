import type { SVGProps } from 'react';

/** 骨头形状 */
export function BoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M14 4c-3 0-5 1.8-6 4-1 .8-3 1-5 1.2-1.5.2-3 .8-3 2.8s1.6 3 3.5 3c2 .2 4.5.5 5.5 1.4 1 2 3 4 6 4 2.5 0 4.5-1.3 5.7-3.2 1.4-1.6 4.2-2.8 11.3-2.8s9.9 1.2 11.3 2.8C54 18.7 56 20 58.5 20c3 0 5-2 5-4.5 0-2-1.5-2.6-3-2.8-2-.2-4-.4-5-1.2-1-2.2-3-4-6-4-2.5 0-4.5 1.3-5.7 3.2-1.4 1.6-4.2 2.8-11.3 2.8s-9.9-1.2-11.3-2.8C18.5 5.3 16.5 4 14 4Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** 鱼骨 */
export function FishBoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10 16c0-3 2-5 5-5s5 2 5 5-2 5-5 5-5-2-5-5Z"
        fill="currentColor"
      />
      <path
        d="M20 16h34M24 12v8M30 10v12M36 12v8M42 10v12M48 12v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M54 16l8-4v8l-8-4Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** 爪印 */
export function PawIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <ellipse cx="16" cy="22" rx="7" ry="6" fill="currentColor" />
      <ellipse cx="8" cy="14" rx="3" ry="4" fill="currentColor" />
      <ellipse cx="24" cy="14" rx="3" ry="4" fill="currentColor" />
      <ellipse cx="13" cy="8" rx="2.5" ry="3.5" fill="currentColor" />
      <ellipse cx="19" cy="8" rx="2.5" ry="3.5" fill="currentColor" />
    </svg>
  );
}

/** 肉块 */
export function MeatChunkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8 16c0-4 3-8 8-8h12c4 0 8 2 10 6l8 12c2 4 0 10-5 12l-12 4c-5 2-12-1-14-6L8 22c-1-3-1-4 0-6Z"
        fill="currentColor"
      />
      <path
        d="M20 14c2 4 6 6 10 5"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** 叶子 */
export function LeafIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6 26C4 14 12 4 26 4c2 12-4 22-20 22Z"
        fill="currentColor"
      />
      <path
        d="M8 24C12 18 18 12 24 8"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** 星星 */
export function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2l2.9 6.4 7 .7-5.2 4.8 1.5 6.9L12 17.6 5.8 21l1.5-7L2 9.1l7-.7L12 2z" />
    </svg>
  );
}

/** 邮戳风圆形章 */
export function CircleStamp({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative grid h-24 w-24 place-items-center rounded-full border-2 border-cocoa/40 text-center ${className}`}
      style={{
        transform: 'rotate(-8deg)',
        background: 'radial-gradient(circle, rgba(244,237,224,0.6) 0%, rgba(244,237,224,0) 70%)',
      }}
    >
      <div className="absolute inset-1.5 rounded-full border border-cocoa/30" />
      <div className="relative z-10 font-mono text-[9px] uppercase leading-tight tracking-widest text-cocoa/70">
        {children}
      </div>
    </div>
  );
}

/** 手写风分隔线 */
export function HandDivider({ label }: { label?: string }) {
  return (
    <div className="divider-hand font-hand text-2xl">
      {label && <span>{label}</span>}
    </div>
  );
}

/** 大型装饰 SVG — 用于背景点缀 */
export function FlourishDecoration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M2 30C40 30 60 10 100 30s60 20 98 0"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <circle cx="100" cy="30" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="50" cy="22" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="150" cy="38" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

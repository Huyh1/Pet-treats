import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Fragment } from 'react';

export interface Crumb {
  label: string;
  to?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="mb-8 flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
      {items.map((item, i) => (
        <Fragment key={i}>
          {item.to ? (
            <Link to={item.to} className="transition-colors hover:text-cocoa">
              {item.label}
            </Link>
          ) : (
            <span className="text-cocoa">{item.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight className="h-3 w-3 opacity-50" />}
        </Fragment>
      ))}
    </nav>
  );
}

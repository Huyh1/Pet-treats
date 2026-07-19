import { StarIcon } from './illustrations';
import { cn } from '@/lib/utils';

export default function RatingStars({
  rating,
  size = 'sm',
  showValue = false,
}: {
  rating: number;
  size?: 'sm' | 'md';
  showValue?: boolean;
}) {
  const sizeClass = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon
            key={i}
            className={cn(
              sizeClass,
              i <= Math.round(rating) ? 'text-gold' : 'text-cocoa/15'
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className="ml-1 font-mono text-xs text-cocoa/70">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}

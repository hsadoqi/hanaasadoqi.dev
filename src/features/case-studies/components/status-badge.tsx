import { BADGE_STYLES, STATUS_BADGE_CONFIG } from '../constants';
import type { BadgeVariant } from '../types';

interface StatusBadgeProps {
  status: string;
  number: string;
  variant?: BadgeVariant;
}

export function StatusBadge({
  status,
  number,
  variant = 'primary',
}: StatusBadgeProps) {
  return (
    <div
      className="flex items-center justify-between gap-3"
      role="group"
      aria-label={`${status} - Project ${number}`}
    >
      <span
        className={`inline-flex w-fit rounded-full ${STATUS_BADGE_CONFIG.padding} ${STATUS_BADGE_CONFIG.size} font-semibold ${STATUS_BADGE_CONFIG.tracking} ${BADGE_STYLES[variant]}`}
        role="status"
        aria-live="polite"
      >
        {status}
      </span>
      <span
        className={`text-muted-foreground/35 ${STATUS_BADGE_CONFIG.numberVariant}`}
        aria-label={`Project number ${number}`}
      >
        {number}
      </span>
    </div>
  );
}

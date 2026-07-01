import { type ReactNode } from 'react';
import type { BadgeColor } from '@/types';

const badgeColorMap: Record<BadgeColor, string> = {
  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  green: 'bg-green-500/10 text-green-600 dark:text-green-400',
  amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  muted: 'bg-muted/30 text-muted-foreground/70',
};

type ContentShowHeroBadge = {
  text: string;
  color: BadgeColor;
};

interface ContentShowHeroProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  meta?: string;
  badges?: ContentShowHeroBadge[];
  extraBadge?: ReactNode;
}

export function ContentShowHero({
  eyebrow,
  title,
  subtitle,
  meta,
  badges = [],
  extraBadge,
}: ContentShowHeroProps) {
  const hasBadges = badges.length > 0 || Boolean(extraBadge);

  return (
    <div className="space-y-6">
      <div>
        <span className="type-eyebrow">{eyebrow}</span>
        <h1 className="type-show-title mt-3">{title}</h1>
        {meta && <p className="type-caption mt-3">{meta}</p>}
        <p className="type-body-lg mt-4 max-w-2xl">{subtitle}</p>
      </div>

      {hasBadges ? (
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, idx) => (
            <span
              key={idx}
              className={`rounded px-3 py-1 text-xs font-medium ${badgeColorMap[badge.color]}`}
            >
              {badge.text}
            </span>
          ))}
          {extraBadge}
        </div>
      ) : null}
    </div>
  );
}

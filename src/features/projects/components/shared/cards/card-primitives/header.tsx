'use client';

import { StatusBadge } from '@/components/shared/display/badges';
import { FeaturedBadge } from '@/components/shared/display/badges/featured-badge';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { StatusType } from '@/types';

export function ProjectCardHeader({
  title,
  meta,
  subtitle,
  status,
  isFeatured,
  techSlot,
  badgeTrailing,
  showBadges = true,
  showFeaturedBadge = true,
  className,
  titleClassName,
  subtitleClassName,
}: {
  title: string;
  meta?: string;
  subtitle?: string;
  status: StatusType;
  isFeatured?: boolean;
  techSlot?: ReactNode;
  badgeTrailing?: ReactNode;
  showBadges?: boolean;
  showFeaturedBadge?: boolean;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}) {
  const trailingBadge =
    badgeTrailing ??
    (isFeatured && showFeaturedBadge ? (
      <FeaturedBadge status={status} />
    ) : null);

  return (
    <div className={cn('flex flex-col space-y-2', className)}>
      {showBadges && (
        <div className="flex items-start justify-between gap-4">
          <StatusBadge status={status}>{status}</StatusBadge>
          {trailingBadge}
        </div>
      )}

      <div className="space-y-2">
        <h3 className={cn('type-card-title-sm', titleClassName)}>{title}</h3>
        {meta && <p className="type-caption text-muted-foreground">{meta}</p>}
        {subtitle && (
          <p className={cn('type-body-sm', subtitleClassName)}>{subtitle}</p>
        )}
      </div>

      {techSlot ? <div className="flex-1 p-2">{techSlot}</div> : null}
    </div>
  );
}

export default ProjectCardHeader;

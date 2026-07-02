'use client';

import {
  PillList,
  StatusBadge,
  FeaturedBadge,
} from '@/components/shared/display/badges';
import { cn } from '@/lib/utils';
import type { StatusType } from '@/types';

type ProjectChipRailProps = {
  status: StatusType;
  isFeatured?: boolean;
  caseStudyCount?: number;
  tags?: string[];
  compactCaseStudyLabel?: boolean;
  tagsLimit?: number;
  className?: string;
  topRowClassName?: string;
  tagsClassName?: string;
};

export function ProjectChipRail({
  status,
  isFeatured = false,
  caseStudyCount = 0,
  tags = [],
  compactCaseStudyLabel = false,
  tagsLimit = 2,
  className,
  topRowClassName,
  tagsClassName,
}: ProjectChipRailProps) {
  const hasTags = tags.length > 0;

  return (
    <div className={cn('space-y-2', className)}>
      <div
        className={cn(
          'flex min-h-6 flex-wrap items-center gap-2',
          topRowClassName,
        )}
      >
        <StatusBadge status={status}>{status}</StatusBadge>

        {isFeatured ? <FeaturedBadge status={status} /> : null}

        {caseStudyCount > 0 ? (
          <span className="border-brand/20 bg-brand/5 text-brand inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium">
            {caseStudyCount}{' '}
            {compactCaseStudyLabel
              ? caseStudyCount === 1
                ? 'study'
                : 'studies'
              : caseStudyCount === 1
                ? 'case study'
                : 'case studies'}
          </span>
        ) : null}
      </div>

      {hasTags ? (
        <PillList
          items={tags}
          limit={tagsLimit}
          overflowLabel="count"
          className={tagsClassName}
        />
      ) : (
        <div className={cn('min-h-6', tagsClassName)} aria-hidden="true" />
      )}
    </div>
  );
}

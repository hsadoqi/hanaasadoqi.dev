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
  const hasCaseStudy = caseStudyCount > 0;
  const caseStudyLabel = compactCaseStudyLabel
    ? caseStudyCount === 1
      ? 'study'
      : 'studies'
    : caseStudyCount === 1
      ? 'case study'
      : 'case studies';

  return (
    <div
      className={cn(
        'divide-border/25 space-y-0 divide-y rounded-md [--row-pad:0.55rem]',
        className,
      )}
    >
      <div
        className={cn(
          'flex min-h-6 flex-wrap items-center gap-2 pb-[var(--row-pad)]',
          topRowClassName,
        )}
      >
        <StatusBadge status={status}>{status}</StatusBadge>

        {isFeatured ? <FeaturedBadge status={status} /> : null}
      </div>

      <div className="pt-[var(--row-pad)] pb-[var(--row-pad)]">
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

      {hasCaseStudy ? (
        <div className="pt-[var(--row-pad)]">
          <div className="flex min-h-6 items-center">
            <span className="border-brand/20 bg-brand/5 text-brand inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium">
              <span aria-hidden="true">↳</span>
              {caseStudyCount} {caseStudyLabel}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

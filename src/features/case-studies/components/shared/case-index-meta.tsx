import { StatusBadge } from '@/components';
import type { CaseStudy } from '@/types';

export function formatStatusLabel(status: string) {
  return status
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function CaseStudyIndexMeta({
  caseStudy,
  projectLabel,
}: {
  caseStudy: CaseStudy;
  projectLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <span className="type-meta text-muted-foreground uppercase">
        {projectLabel}
      </span>
      <StatusBadge status={caseStudy.status.value}>
        {formatStatusLabel(caseStudy.status.value)}
      </StatusBadge>
    </div>
  );
}

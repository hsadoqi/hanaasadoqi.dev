import type { CaseStudy } from '@/types';
import { CaseStudyIndexLink } from '../shared/case-index-link';
import { CaseStudyIndexMeta } from '../shared/case-index-meta';
import { CaseStudyTopicList } from './case-index-topic-list';

export function CaseStudyIndexListItem({
  caseStudy,
  projectLabel,
}: {
  caseStudy: CaseStudy;
  projectLabel: string;
}) {
  return (
    <CaseStudyIndexLink
      caseStudy={caseStudy}
      className="group border-border/30 hover:bg-muted/20 focus-visible:ring-ring block border-b p-5 transition-colors last:border-b-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <article className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
        <div className="min-w-0 space-y-3">
          <CaseStudyIndexMeta
            caseStudy={caseStudy}
            projectLabel={projectLabel}
          />
          <div>
            <h2 className="type-card-title-sm group-hover:text-foreground/80">
              {caseStudy.title}
            </h2>
            <p className="type-body-sm mt-2 line-clamp-2">
              {caseStudy.subtitle}
            </p>
          </div>
          <CaseStudyTopicList tags={caseStudy.tags} />
        </div>

        <span className="type-caption text-muted-foreground group-hover:text-foreground font-medium whitespace-nowrap">
          View <span aria-hidden="true">-&gt;</span>
        </span>
      </article>
    </CaseStudyIndexLink>
  );
}

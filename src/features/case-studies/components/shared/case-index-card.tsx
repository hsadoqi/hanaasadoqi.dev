import type { CaseStudy } from '@/types';
import { CaseStudyIndexLink } from './case-index-link';
import { CaseStudyIndexMeta } from './case-index-meta';
import { CaseStudyTopicList } from '../layouts/case-index-topic-list';

export function CaseStudyIndexCard({
  caseStudy,
  projectLabel,
}: {
  caseStudy: CaseStudy;
  projectLabel: string;
}) {
  return (
    <CaseStudyIndexLink
      caseStudy={caseStudy}
      className="group border-border/40 bg-background hover:border-border/70 hover:bg-muted/20 focus-visible:ring-ring block h-full rounded-lg border p-6 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <article className="flex h-full flex-col gap-5">
        <CaseStudyIndexMeta caseStudy={caseStudy} projectLabel={projectLabel} />

        <div>
          <h2 className="type-card-title group-hover:text-foreground/80">
            {caseStudy.title}
          </h2>
          {caseStudy.readingTime && (
            <p className="type-caption text-muted-foreground mt-2">
              {caseStudy.readingTime.text}
            </p>
          )}
          <p className="type-body-sm mt-3 line-clamp-3">{caseStudy.subtitle}</p>
        </div>

        <CaseStudyTopicList tags={caseStudy.tags} />

        <span className="type-body-sm text-foreground/60 group-hover:text-foreground mt-auto ml-auto font-medium">
          View <span aria-hidden="true">-&gt;</span>
        </span>
      </article>
    </CaseStudyIndexLink>
  );
}

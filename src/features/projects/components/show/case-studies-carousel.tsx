import Link from 'next/link';
import type { StatusType } from '@/types';
import { StatusBadge } from '@/components/shared/badges';
import { ProjectTagList } from '../shared/tag-list';

export type CaseStudyCard = {
  slug: string;
  title: string;
  subtitle: string;
  status: StatusType;
  tags: string[];
};

type CaseStudiesCarouselProps = {
  caseStudies: CaseStudyCard[];
  projectSlug: string;
};

export function CaseStudiesCarousel({
  caseStudies,
  projectSlug,
}: CaseStudiesCarouselProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-foreground text-2xl font-bold text-balance sm:text-3xl">
            Related case studies
          </h2>
          <p className="text-muted-foreground/70 mt-2 text-sm">
            Technical decisions and product lessons from this project.
          </p>
        </div>

        <Link
          href="/case-studies"
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring w-fit rounded text-sm font-medium focus-visible:ring-2 focus-visible:outline-none"
        >
          View all case studies <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="flex snap-x gap-4 overflow-x-auto pb-4">
        {caseStudies.map((study) => (
          <Link
            key={study.slug}
            href={`/projects/${projectSlug}/${study.slug}`}
            className="border-border/40 bg-background hover:border-border/70 focus-visible:ring-ring min-w-[min(82vw,320px)] snap-start rounded-lg border p-5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <div className="space-y-4">
              <StatusBadge status={study.status}>{study.status}</StatusBadge>
              <div>
                <h3 className="text-foreground text-base font-semibold">
                  {study.title}
                </h3>
                <p className="text-muted-foreground/70 mt-2 line-clamp-3 text-sm leading-relaxed">
                  {study.subtitle}
                </p>
              </div>
              <ProjectTagList tags={study.tags} limit={3} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

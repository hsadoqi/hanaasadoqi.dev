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
          <h2 className="type-section-title">Related case studies</h2>
          <p className="type-body-sm mt-2">
            Technical decisions and product lessons from this project.
          </p>
        </div>

        <Link
          href="/case-studies"
          className="type-body-sm hover:text-foreground focus-visible:ring-ring w-fit rounded font-medium focus-visible:ring-2 focus-visible:outline-none"
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
            <div className="max-h-[300px] max-w-[250px] space-y-4">
              <StatusBadge status={study.status}>{study.status}</StatusBadge>
              <div>
                <h3 className="type-card-title-sm">{study.title}</h3>
                <p className="type-body-sm mt-2 line-clamp-3">
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

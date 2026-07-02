import {
  RelatedCaseStudyCard,
  CaseStudiesCarousel,
} from '@/features/case-studies';
import Link from 'next/link';

export const ProjectCta = () => (
  <section className="border-border/40 border-t px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
    <div className="mx-auto max-w-4xl">
      <div className="space-y-4 text-center">
        <p className="type-eyebrow">Back to portfolio</p>
        <Link
          href="/projects"
          className="type-body-sm inline-block font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View all projects →
        </Link>
      </div>
    </div>
  </section>
);

export const RelatedCaseStudies = ({
  relatedCaseStudies,
  projectSlug,
}: {
  relatedCaseStudies: RelatedCaseStudyCard[];
  projectSlug: string;
}) => (
  <section
    id="related-case-studies"
    className="px-6 py-16 sm:px-8 sm:py-24 lg:px-12"
  >
    <div className="mx-auto max-w-6xl">
      <CaseStudiesCarousel
        caseStudies={relatedCaseStudies}
        projectSlug={projectSlug}
      />
    </div>
  </section>
);

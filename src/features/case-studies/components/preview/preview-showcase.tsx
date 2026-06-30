import { CaseStudy } from '@/types';
import { caseStudies } from '../../data';
import { CaseStudyPreviewCard } from '../preview';

export function PreviewShowcase() {
  const [featuredStudy, ...supportingStudies] = caseStudies;

  if (!featuredStudy) return null;

  return (
    <section className="border-border/50 bg-background border-t py-20 sm:py-28">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 max-w-2xl">
          <p className="type-eyebrow mb-3">Projects</p>
          <h2 className="type-section-title">
            Work shown through artifacts, not decoration.
          </h2>
          <p className="type-body-sm mt-4 max-w-xl">
            A homepage project section can use cropped interface evidence to
            show what made each system difficult before asking someone to read
            the full case study.
          </p>
        </header>

        <div className="space-y-5">
          <CaseStudyPreviewCard
            data={featuredStudy as unknown as CaseStudy}
            imagePlacement="side"
            number="01"
          />
          {supportingStudies.length > 0 && (
            <div className="grid gap-5 lg:grid-cols-2">
              {supportingStudies.map((study, index) => (
                <CaseStudyPreviewCard
                  key={study.slug}
                  data={study as unknown as CaseStudy}
                  imagePlacement="stack"
                  number={String(index + 2).padStart(2, '0')}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import { CaseStudy } from '@/types';
import { oneData, threeData, twoData } from '../../data';
import { CaseStudyPreviewCard } from '../preview';

export function PreviewShowcase() {
  return (
    <section className="border-border/50 bg-background border-t py-20 sm:py-28">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 max-w-2xl">
          <p className="text-muted-foreground mb-3 text-sm tracking-[0.28em] uppercase">
            Projects
          </p>
          <h2 className="text-foreground text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
            Work shown through artifacts, not decoration.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-7">
            A homepage project section can use cropped interface evidence to
            show what made each system difficult before asking someone to read
            the full case study.
          </p>
        </header>

        <div className="space-y-5">
          <CaseStudyPreviewCard
            data={oneData as unknown as CaseStudy}
            imagePlacement="side"
            number="01"
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <CaseStudyPreviewCard
              data={twoData as unknown as CaseStudy}
              imagePlacement="stack"
              number="02"
            />
            <CaseStudyPreviewCard
              data={threeData as unknown as CaseStudy}
              imagePlacement="stack"
              number="03"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

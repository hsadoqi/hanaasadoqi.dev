import { CaseStudy } from '@/types/content';
import { Pill } from '@/components/shared/pill';

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

export function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  const displayIndex = String(index + 2).padStart(2, '0');

  return (
    <article
      className="group border-border/50 bg-card text-card-foreground hover:border-border focus-within:border-border relative flex h-full max-w-[min(76vw,300px)] min-w-[min(76vw,300px)] snap-start flex-col rounded-xl border p-6 hover:shadow-lg hover:shadow-black/[0.05] motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out sm:max-w-[300px] sm:min-w-[300px] md:max-w-[320px] md:min-w-[320px] md:p-7 lg:max-w-[340px] lg:min-w-[340px]"
      aria-label={`Project: ${study.title}`}
    >
      {/* Status + index */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <span
          className="inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide"
          data-status={study.statusVariant}
        >
          <span
            className="size-1.5 rounded-full bg-current opacity-70"
            aria-hidden="true"
          />
          {study.status}
        </span>
        <span className="text-muted-foreground/40 font-mono text-[11px] tabular-nums select-none">
          {displayIndex}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-foreground mb-3 text-base leading-snug font-semibold tracking-tight text-balance">
        {study.title}
      </h3>

      {/* Problem */}
      <div className="mb-4">
        <p className="text-muted-foreground/50 mb-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
          Problem
        </p>
        <p className="text-muted-foreground line-clamp-4 text-[13px] leading-relaxed">
          {study.problem}
        </p>
      </div>

      {/* Role */}
      <div className="mb-5">
        <p className="text-muted-foreground/50 mb-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
          My role
        </p>
        <p className="text-muted-foreground line-clamp-3 text-[13px] leading-relaxed">
          {study.role}
        </p>
      </div>

      {/* Focus tags */}
      <div className="mb-5 flex flex-wrap gap-2">
        {study.focus.map((tag) => (
          <Pill key={tag} variant="focus">
            {tag}
          </Pill>
        ))}
      </div>

      {/* Proof / context */}
      <div className="border-border/40 mb-5 border-l-2 pl-3">
        <p className="text-muted-foreground/65 text-[13px] leading-relaxed italic">
          {study.proof}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <a
          href={study.ctaHref}
          className="text-foreground/60 hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-1.5 rounded text-[13px] font-medium focus-visible:ring-1 focus-visible:outline-none motion-safe:transition-colors motion-safe:duration-200"
          aria-label={`View project details for ${study.title}: ${study.ctaLabel}`}
        >
          {study.ctaLabel}
          <span
            aria-hidden="true"
            className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
          >
            →
          </span>
        </a>
      </div>
    </article>
  );
}

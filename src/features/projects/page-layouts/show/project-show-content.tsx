import { MDXContent } from '@/components/mdx';

export const ProjectShowContent = ({
  problem,
  solution,
  impactSummary,
  mdx,
}: {
  problem?: string;
  solution?: string;
  impactSummary?: string[];
  mdx?: string;
}) => (
  <section className="border-border/40 border-b px-6 py-4 sm:px-8 md:py-8 lg:px-12">
    <div className="mx-auto max-w-4xl space-y-16">
      {(problem || solution) && (
        <div className="grid gap-4 md:grid-cols-2">
          {problem && (
            <div className="border-border/40 bg-background/50 rounded-lg border p-5">
              <p className="type-eyebrow mb-3">Problem</p>
              <p className="type-body-sm">{problem}</p>
            </div>
          )}
          {solution && (
            <div className="border-border/40 bg-background/50 rounded-lg border p-5">
              <p className="type-eyebrow mb-3">Solution</p>
              <p className="type-body-sm">{solution}</p>
            </div>
          )}
        </div>
      )}

      {impactSummary && impactSummary.length > 0 && (
        <div className="space-y-6">
          <div>
            <h2 className="type-section-title">Impact & Vision</h2>
            <p className="type-body-sm mt-2">Why this matters</p>
          </div>
          <div className="max-w-none">
            {impactSummary.map((impact) => (
              <p key={impact} className="type-body">
                {impact}
              </p>
            ))}
          </div>
        </div>
      )}

      {mdx && (
        <div className="prose-portfolio space-y-10">
          <MDXContent code={mdx} />
        </div>
      )}
    </div>
  </section>
);

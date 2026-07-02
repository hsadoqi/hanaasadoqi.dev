import {
  ContentShowContent,
  type ContentShowCard,
} from '@/components/shared/display/views/show-view';
import type { AnyLink } from '@/types';

export const ProjectShowContent = ({
  problem,
  solution,
  impactSummary,
  linkItems,
  mdx,
}: {
  problem?: string;
  solution?: string;
  impactSummary?: string[];
  linkItems?: AnyLink[];
  mdx?: string;
}) => {
  const cards: ContentShowCard[] = [
    ...(problem ? [{ id: 'problem', label: 'Problem', body: problem }] : []),
    ...(solution
      ? [{ id: 'solution', label: 'Solution', body: solution }]
      : []),
  ];

  return (
    <ContentShowContent
      cards={cards}
      cardColumns={2}
      contentClassName="space-y-16"
      linkItems={linkItems}
      mdx={mdx}
      sectionClassName="py-4 md:py-8 sm:py-4"
    >
      {impactSummary && impactSummary.length > 0 ? (
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
      ) : null}
    </ContentShowContent>
  );
};

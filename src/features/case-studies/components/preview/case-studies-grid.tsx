'use client';

import { CaseStudyPreviewCardEnhanced } from './case-study-preview-card-enhanced';
import type { CaseStudy } from '@/types';

export interface CaseStudiesGridProps {
  caseStudies: CaseStudy[];
}

export function CaseStudiesGrid({ caseStudies }: CaseStudiesGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {caseStudies.map((caseStudy, index) => (
        <CaseStudyPreviewCardEnhanced
          key={caseStudy.slug}
          data={caseStudy}
          number={String(index + 1).padStart(2, '0')}
          showImage={true}
        />
      ))}
    </div>
  );
}

import type { CaseStudy } from '@/types';
import Link from 'next/link';
import { ReactNode } from 'react';

export function CaseStudyIndexLink({
  caseStudy,
  children,
  className,
}: {
  caseStudy: CaseStudy;
  children: ReactNode;
  className: string;
}) {
  return (
    <Link
      href={`/projects/${caseStudy.project_slug}/${caseStudy.slug}`}
      className={className}
    >
      {children}
    </Link>
  );
}

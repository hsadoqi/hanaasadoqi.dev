import type { Metadata } from 'next';

import { CaseStudiesIndex } from '@/features/case-studies/components';
import { loadAllCaseStudies } from '@/features/case-studies/lib';
import { loadAllProjects } from '@/features/projects/lib';

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Browse technical case studies across projects, filtered by project, status, and focus area.',
};

export default async function CaseStudiesPage() {
  const [caseStudies, projects] = await Promise.all([
    loadAllCaseStudies(),
    loadAllProjects(),
  ]);

  return (
    <CaseStudiesIndex
      caseStudies={caseStudies}
      projects={projects.map((project) => ({
        slug: project.slug,
        title: project.title,
      }))}
    />
  );
}

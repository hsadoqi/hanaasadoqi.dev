import { CaseStudiesIndex } from './case-studies-index';
import { loadAllCaseStudies } from '../../lib';
import { loadAllProjects } from '@/features/projects/lib';

export default async function CaseStudiesIndexPage() {
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

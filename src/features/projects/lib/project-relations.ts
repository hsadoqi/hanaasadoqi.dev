import type { CaseStudy, Project, RelatedCaseStudy } from '@/types';

function toRelatedCaseStudy(caseStudy: CaseStudy): RelatedCaseStudy {
  return {
    title: caseStudy.title,
    slug: caseStudy.slug,
    description: caseStudy.description,
    status: caseStudy.status.value,
    tags: caseStudy.tags,
  };
}

export function hydrateProjectCaseStudies(
  projects: Project[],
  caseStudies: CaseStudy[],
) {
  const caseStudiesBySlug = new Map(
    caseStudies.map((caseStudy) => [caseStudy.slug, caseStudy]),
  );
  const caseStudiesByProject = caseStudies.reduce((map, caseStudy) => {
    const projectCaseStudies = map.get(caseStudy.project_slug) ?? [];
    projectCaseStudies.push(caseStudy);
    map.set(caseStudy.project_slug, projectCaseStudies);

    return map;
  }, new Map<string, CaseStudy[]>());

  return projects.map((project) => {
    const related =
      project.relatedCaseStudies.length > 0
        ? project.relatedCaseStudies
            .map((slug) => caseStudiesBySlug.get(slug))
            .filter((item): item is CaseStudy => Boolean(item))
        : (caseStudiesByProject.get(project.slug) ?? []);

    return {
      ...project,
      caseStudies: related.map(toRelatedCaseStudy),
    };
  });
}

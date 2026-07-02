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

export type ProjectDisplayItem = Project | CaseStudy;

export function getProjectSlug(item: ProjectDisplayItem) {
  return 'project_slug' in item ? item.project_slug : item.slug;
}

export function getFirstCaseStudySlug(item: ProjectDisplayItem) {
  if ('project_slug' in item) return item.slug;
  if ('caseStudies' in item) return item.caseStudies?.[0]?.slug;
  if ('relatedCaseStudies' in item) return item.relatedCaseStudies?.[0];
}

export function getProjectHref(projectSlug: string) {
  return `/projects/${projectSlug}`;
}

export function getCaseStudyHref(projectHref: string, caseStudySlug?: string) {
  return caseStudySlug ? `${projectHref}/${caseStudySlug}` : undefined;
}

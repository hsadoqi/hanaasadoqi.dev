import type { CaseStudy, Project } from '@/types';

export type ProjectLink = {
  href: string;
  label: string;
  isExternal: boolean;
  isDisabled: boolean;
};

type ProjectDisplayItem = Project | CaseStudy;

export function getProjectDisplay(project: ProjectDisplayItem) {
  const isFeaturedProject = project.featured;
  const link = getProjectLink(project);
  const tags = project.tags ?? [];
  const techStack = project.techStack ?? [];

  return {
    title: project.title,
    subtitle: isFeaturedProject
      ? project.subtitle
      : (project.problem ?? project.subtitle),
    href: link.href,
    link,
    status: project.status.value,
    tags,
    focus: tags,
    techStack,
    isFeaturedProject,
  };
}

export function getProjectLink(project: ProjectDisplayItem): ProjectLink {
  const primaryCta = project.ctaItems?.[0];
  const projectSlug =
    'project_slug' in project ? project.project_slug : project.slug;
  const relatedCaseStudySlug =
    'relatedCaseStudies' in project ? project.relatedCaseStudies?.[0] : undefined;
  const projectHref = `/projects/${projectSlug}`;
  const caseStudyHref = relatedCaseStudySlug
    ? `${projectHref}/${relatedCaseStudySlug}`
    : undefined;
  const primaryCtaHref = primaryCta?.link;
  const shouldUsePrimaryCta =
    primaryCtaHref && (primaryCtaHref !== projectHref || !caseStudyHref);
  const href = shouldUsePrimaryCta
    ? primaryCtaHref
    : (caseStudyHref ?? projectHref);

  return {
    href,
    label:
      !shouldUsePrimaryCta && caseStudyHref
        ? 'View case study'
        : (primaryCta?.label ?? 'View project'),
    isExternal: /^https?:\/\//.test(href),
    isDisabled: project.isComingSoon ?? false,
  };
}

export function isFeaturedCaseStudy(project: ProjectDisplayItem) {
  return project.featured;
}

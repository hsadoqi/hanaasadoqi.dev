import type { CaseStudy, Project } from '@/types';
import {
  formatContentMeta,
  getContentDateMeta,
} from '@/lib/content/content-meta';
import { isDraftContent } from '@/lib/content/content-visibility';
import {
  getCaseStudyHref,
  getFirstCaseStudySlug,
  getProjectHref,
  getProjectSlug,
  type ProjectDisplayItem,
} from './project-relations';

export type ProjectLink = {
  href: string;
  label: string;
  isExternal: boolean;
  isDisabled: boolean;
};

export function getProjectDisplay(project: ProjectDisplayItem) {
  const isFeaturedProject = project.featured;
  const link = getProjectLink(project);
  const tags = project.tags ?? [];
  const techStack = project.techStack ?? [];
  const relatedCaseStudySlugs =
    'relatedCaseStudies' in project ? (project.relatedCaseStudies ?? []) : [];
  const caseStudies =
    'caseStudies' in project ? (project.caseStudies ?? []) : [];
  const projectSlug = getProjectSlug(project);
  const firstCaseStudySlug =
    caseStudies[0]?.slug ?? relatedCaseStudySlugs[0] ?? undefined;

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
    date: getContentDateMeta(project),
    meta: formatContentMeta(project),
    readingTime: project.readingTime,
    isFeaturedProject,
    caseStudyCount: caseStudies.length || relatedCaseStudySlugs.length,
    caseStudyHref: getCaseStudyHref(
      getProjectHref(projectSlug),
      firstCaseStudySlug,
    ),
  };
}

export function getProjectLink(project: ProjectDisplayItem): ProjectLink {
  const isComingSoon = isDraftContent(project) || project.isComingSoon;
  const primaryCta = project.ctaItems?.[0];
  const projectHref = getProjectHref(getProjectSlug(project));
  const caseStudyHref = getCaseStudyHref(
    projectHref,
    getFirstCaseStudySlug(project),
  );
  const primaryCtaHref = primaryCta?.link;
  const shouldUsePrimaryCta =
    primaryCtaHref && (primaryCtaHref !== projectHref || !caseStudyHref);
  const href = shouldUsePrimaryCta
    ? primaryCtaHref
    : (caseStudyHref ?? projectHref);

  return {
    href,
    label: isComingSoon
      ? 'Coming soon'
      : !shouldUsePrimaryCta && caseStudyHref
        ? 'View case study'
        : (primaryCta?.label ?? 'View project'),
    isExternal: /^https?:\/\//.test(href),
    isDisabled: isComingSoon || (project.isDisabled ?? false),
  };
}

export function isFeaturedCaseStudy(project: CaseStudy | Project) {
  return project.featured;
}

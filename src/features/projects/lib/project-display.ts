import type { CaseStudy, Project } from '@/types';
import {
  formatContentMeta,
  getContentDateMeta,
} from '@/lib/content/content-meta';
import { isDraftContent } from '@/lib/content/content-visibility';

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
  const relatedCaseStudySlugs =
    'relatedCaseStudies' in project ? (project.relatedCaseStudies ?? []) : [];
  const caseStudies =
    'caseStudies' in project ? (project.caseStudies ?? []) : [];
  const projectSlug =
    'projectSlug' in project ? project.projectSlug : project.slug;

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
    caseStudyHref:
      (caseStudies[0]?.slug ?? relatedCaseStudySlugs[0])
        ? `/projects/${projectSlug}/${caseStudies[0]?.slug ?? relatedCaseStudySlugs[0]}`
        : undefined,
  };
}

export function getProjectLink(project: ProjectDisplayItem): ProjectLink {
  const isComingSoon = isDraftContent(project) || project.isComingSoon;
  const primaryCta = project.ctaItems?.[0];
  const projectSlug =
    'projectSlug' in project ? project.projectSlug : project.slug;
  const caseStudySlug =
    'caseStudies' in project ? project.caseStudies?.[0]?.slug : undefined;
  const relatedCaseStudySlug =
    caseStudySlug ??
    ('relatedCaseStudies' in project
      ? project.relatedCaseStudies?.[0]
      : undefined);
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
    label: isComingSoon
      ? 'Coming soon'
      : !shouldUsePrimaryCta && caseStudyHref
        ? 'View case study'
        : (primaryCta?.label ?? 'View project'),
    isExternal: /^https?:\/\//.test(href),
    isDisabled: isComingSoon || (project.isDisabled ?? false),
  };
}

export function isFeaturedCaseStudy(project: ProjectDisplayItem) {
  return project.featured;
}

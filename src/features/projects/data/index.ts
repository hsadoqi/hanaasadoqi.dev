import type { CaseStudy, Project } from '@/types';
import { allCaseStudies, allProjects } from 'content-collections';
import { isListedContent } from '@/lib/content/content-visibility';
import { hydrateProjectCaseStudies } from '../lib/project-relations';

export const projects = hydrateProjectCaseStudies(
  (allProjects as Project[]).filter(isListedContent),
  (allCaseStudies as CaseStudy[]).filter(isListedContent),
);

export const generafiData = projects.find(
  (project) => project.slug === 'generafi',
);
export const moroccanFintechData = projects.find(
  (project) => project.slug === 'moroccan-fintech',
);
export const synapcityData = projects.find(
  (project) => project.slug === 'synapcity',
);

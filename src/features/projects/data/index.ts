import type { Project } from '@/types';
import blogData from './final-projects/blog.json';
import generafiData from './final-projects/generafi.json';
import moroccanFintechData from './final-projects/moroccan-fintech.json';
import synapcityData from './final-projects/synapcity.json';

function normalizeProject(data: unknown): Project {
  const project = data as Partial<Project>;

  return {
    ...project,
    featured: project.featured ?? false,
    tags: project.tags ?? [],
    ctaItems: project.ctaItems ?? [],
    linkItems: project.linkItems ?? [],
    relatedCaseStudies: project.relatedCaseStudies ?? [],
  } as Project;
}

export const projects: Project[] = [
  blogData,
  generafiData,
  moroccanFintechData,
  synapcityData,
].map(normalizeProject);

export { blogData, generafiData, moroccanFintechData, synapcityData };

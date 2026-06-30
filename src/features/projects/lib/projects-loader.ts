import { allCaseStudies, allProjects } from 'content-collections';
import type { CaseStudy, Project } from '@/types';
import {
  isListedContent,
  isPublicContent,
  isRoutableContent,
} from '@/lib/content-visibility';
import { hydrateProjectCaseStudies } from './project-relations';

const projects = hydrateProjectCaseStudies(
  allProjects as Project[],
  allCaseStudies as CaseStudy[],
);

function sortProjects(items: Project[]) {
  return [...items].sort((a, b) => a.title.localeCompare(b.title));
}

export async function getProjectShowSlugs(): Promise<string[]> {
  return projects
    .filter(isRoutableContent)
    .map((project) => project.slug)
    .sort();
}

export async function getPublicProjectSlugs(): Promise<string[]> {
  return projects
    .filter(isPublicContent)
    .map((project) => project.slug)
    .sort();
}

export async function loadCaseStudies(): Promise<string[]> {
  return getProjectShowSlugs();
}

export async function loadProjectShowData(
  slug: string,
): Promise<Project | null> {
  return (
    projects.find(
      (project) => project.slug === slug && isRoutableContent(project),
    ) ?? null
  );
}

export async function loadAllProjects(): Promise<Project[]> {
  return sortProjects(projects.filter(isListedContent));
}

export async function loadPublicProjects(): Promise<Project[]> {
  return sortProjects(projects.filter(isPublicContent));
}

export async function loadProjectBySlug(slug: string): Promise<Project> {
  const project = projects.find((p) => p.slug === slug && isRoutableContent(p));
  if (!project) {
    throw new Error(`Project "${slug}" not found`);
  }
  return project;
}

export async function loadCaseStudiesShowData(slug: string): Promise<Project> {
  return loadProjectBySlug(slug);
}

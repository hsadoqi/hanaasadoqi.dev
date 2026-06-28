import { readdir, readFile } from 'fs/promises';
import { join, parse } from 'path';
import type { Project } from '@/types';

export async function getProjectShowSlugs(): Promise<string[]> {
  const dirPath = getProjectShowDataDir();
  const filenames = await readdir(dirPath);

  return filenames
    .filter((filename) => filename.endsWith('.json'))
    .map((filename) => parse(filename).name)
    .filter((slug) => slug !== 'TEMPLATE' && slug !== 'PROJECT_TEMPLATE')
    .sort();
}

export async function loadCaseStudies(): Promise<string[]> {
  try {
    const dirPath = getProjectShowDataDir();
    const entries = await readdir(dirPath);
    return entries
      .filter((entry): entry is string => typeof entry === 'string')
      .filter(
        (entry) =>
          entry.endsWith('.json') ||
          entry.endsWith('.ts') ||
          entry.endsWith('.tsx'),
      )
      .map((entry) => entry.replace(/\.(json|ts|tsx)$/, ''));
  } catch (error) {
    console.error('Error loading case studies:', error);
    return [];
  }
}

// Loader function
export async function loadProjectShowData(
  slug: string,
): Promise<Project | null> {
  try {
    const filePath = join(getProjectShowDataDir(), `${slug}.json`);
    const content = await readFile(filePath, 'utf-8');
    const data = JSON.parse(content) as Project;
    return data;
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return null;
    }

    throw error;
  }
}

function getProjectShowDataDir() {
  return join(
    process.cwd(),
    'src',
    'features',
    'projects',
    'data',
    'final-projects',
  );
}

function getProjectsDir() {
  return join(
    process.cwd(),
    'src',
    'features',
    'projects',
    'data',
    'final-projects',
  );
}

export async function loadAllProjects(): Promise<Project[]> {
  try {
    const projectsDir = getProjectsDir();
    const files = await readdir(projectsDir);
    const jsonFiles = files.filter(
      (file) => file.endsWith('.json') && file !== 'TEMPLATE.json',
    );

    const projects: Project[] = [];
    for (const file of jsonFiles) {
      try {
        const filePath = join(projectsDir, file);
        const content = await readFile(filePath, 'utf-8');
        const project = JSON.parse(content) as Project;
        projects.push(project);
      } catch (err) {
        console.error(`Failed to load project from ${file}:`, err);
      }
    }

    return projects.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error('Failed to load projects directory:', error);
    throw new Error('Failed to load projects');
  }
}

export async function loadProjectBySlug(slug: string): Promise<Project> {
  const projects = await loadAllProjects();
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    throw new Error(`Project "${slug}" not found`);
  }
  return project;
}

// export async function loadProjectShowData(
//   slug: string,
// ): Promise<Project> {
//   try {
//     const { readFile } = await import('fs/promises');
//     const { join } = await import('path');

//     const filePath = join(process.cwd(), `data/projects/${slug}.json`);
//     const content = await readFile(filePath, 'utf-8');
//     const data = JSON.parse(content);
//     return data;
//   } catch (error) {
//     console.error(`Failed to load project data for slug: ${slug}`, error);
//     throw new Error(`Project "${slug}" not found`);
//   }
// }

export async function loadCaseStudiesShowData(slug: string): Promise<Project> {
  try {
    const { readFile } = await import('fs/promises');
    const { join } = await import('path');

    // Try case-studies first (new location), fall back to projects-show
    let filePath = join(process.cwd(), `data/case-studies/${slug}.json`);
    try {
      const { accessSync } = await import('fs');
      accessSync(filePath);
    } catch {
      filePath = join(process.cwd(), `data/projects-show/${slug}.json`);
    }

    const content = await readFile(filePath, 'utf-8');
    const data = JSON.parse(content) as Project;
    return data;
  } catch (error) {
    console.error(`Failed to load project data for slug: ${slug}`, error);
    throw new Error(`Project "${slug}" not found`);
  }
}

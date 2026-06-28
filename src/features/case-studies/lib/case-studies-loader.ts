import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import type { CaseStudy } from '@/types';

function getCaseStudiesDir() {
  return join(
    process.cwd(),
    'src',
    'features',
    'case-studies',
    'data',
    'final-studies',
  );
}

export async function loadCaseStudies(): Promise<string[]> {
  try {
    const dirPath = getCaseStudiesDir();
    const entries = await readdir(dirPath);
    return entries
      .filter((entry): entry is string => typeof entry === 'string')
      .filter((entry) => entry.endsWith('.json') && !entry.includes('TEMPLATE'))
      .map((entry) => entry.replace(/\.json$/, ''));
  } catch (error) {
    console.error('Error loading case studies:', error);
    return [];
  }
}

export async function loadAllCaseStudies(): Promise<CaseStudy[]> {
  try {
    const caseStudiesDir = getCaseStudiesDir();
    const files = await readdir(caseStudiesDir);
    const jsonFiles = files.filter(
      (file) => file.endsWith('.json') && !file.includes('TEMPLATE'),
    );

    const caseStudies: CaseStudy[] = [];
    for (const file of jsonFiles) {
      try {
        const filePath = join(caseStudiesDir, file);
        const content = await readFile(filePath, 'utf-8');
        const caseStudy = JSON.parse(content) as CaseStudy;
        caseStudies.push(caseStudy);
      } catch (err) {
        console.error(`Failed to load case study from ${file}:`, err);
      }
    }

    return caseStudies.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error('Failed to load case studies directory:', error);
    throw new Error('Failed to load case studies');
  }
}

export async function loadCaseStudyBySlug(slug: string): Promise<CaseStudy> {
  const caseStudies = await loadAllCaseStudies();
  const caseStudy = caseStudies.find((c) => c.slug === slug);
  if (!caseStudy) {
    throw new Error(`Case study "${slug}" not found`);
  }
  return caseStudy;
}

export async function loadCaseStudiesByProject(
  projectSlug: string,
): Promise<CaseStudy[]> {
  const caseStudies = await loadAllCaseStudies();
  return caseStudies.filter((c) => c.project_slug === projectSlug);
}

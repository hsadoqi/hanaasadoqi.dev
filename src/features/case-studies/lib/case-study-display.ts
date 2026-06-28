import { readFile } from 'fs/promises';
import { join } from 'path';
import type { CaseStudy, PresentationalSection } from '@/types';

function getCaseStudyFilePath(slug: string) {
  return join(
    process.cwd(),
    'src',
    'features',
    'case-studies',
    'data',
    'final-studies',
    `${slug}.json`,
  );
}

export async function loadCaseStudyShowData(slug: string): Promise<CaseStudy> {
  try {
    const content = await readFile(getCaseStudyFilePath(slug), 'utf-8');
    return JSON.parse(content) as CaseStudy;
  } catch (error) {
    console.error(`Failed to load case study data for slug: ${slug}`, error);
    throw new Error(`Case study "${slug}" not found`);
  }
}

export type { CaseStudy, PresentationalSection };

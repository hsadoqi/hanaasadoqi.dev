import { allCaseStudies } from 'content-collections';
import type { CaseStudy } from '@/types';
import {
  isListedContent,
  isPublicContent,
  isRoutableContent,
} from '@/lib/content/content-visibility';

const caseStudies = allCaseStudies as CaseStudy[];

function sortCaseStudies(items: CaseStudy[]) {
  return [...items].sort((a, b) => a.title.localeCompare(b.title));
}

export async function loadCaseStudies(): Promise<string[]> {
  return caseStudies
    .filter(isRoutableContent)
    .map((caseStudy) => caseStudy.slug)
    .sort();
}

export async function loadAllCaseStudies(): Promise<CaseStudy[]> {
  return sortCaseStudies(caseStudies.filter(isListedContent));
}

export async function loadRoutableCaseStudies(): Promise<CaseStudy[]> {
  return sortCaseStudies(caseStudies.filter(isRoutableContent));
}

export async function loadPublicCaseStudies(): Promise<CaseStudy[]> {
  return sortCaseStudies(caseStudies.filter(isPublicContent));
}

export async function loadCaseStudyBySlug(slug: string): Promise<CaseStudy> {
  const caseStudy = caseStudies.find(
    (c) => c.slug === slug && isRoutableContent(c),
  );
  if (!caseStudy) {
    throw new Error(`Case study "${slug}" not found`);
  }
  return caseStudy;
}

export async function loadCaseStudiesByProject(
  projectSlug: string,
): Promise<CaseStudy[]> {
  return sortCaseStudies(
    caseStudies.filter(
      (c) => c.project_slug === projectSlug && isListedContent(c),
    ),
  );
}

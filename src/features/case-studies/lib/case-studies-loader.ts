import { allCaseStudies } from 'content-collections';
import type { CaseStudy } from '@/types';
import {
  isListedContent,
  isPublicContent,
  isRoutableContent,
} from '@/lib/content/content-visibility';

const caseStudies = allCaseStudies as CaseStudy[];

function sortCaseStudiesByKey(
  items: CaseStudy[],
  key?: keyof CaseStudy,
): CaseStudy[] {
  const sortKey = key || 'title';
  return [...items].sort((a, b) => {
    const aValue = a[sortKey]!;
    const bValue = b[sortKey]!;
    if (aValue < bValue) return -1;
    if (aValue > bValue) return 1;
    return 0;
  });
}

export async function loadCaseStudies(): Promise<string[]> {
  return caseStudies
    .filter(isRoutableContent)
    .map((caseStudy) => caseStudy.slug)
    .sort();
}

export async function loadAllCaseStudies(): Promise<CaseStudy[]> {
  return sortCaseStudiesByKey(caseStudies.filter(isListedContent));
}

export async function loadRoutableCaseStudies(): Promise<CaseStudy[]> {
  return sortCaseStudiesByKey(caseStudies.filter(isRoutableContent));
}

export async function loadPublicCaseStudies(): Promise<CaseStudy[]> {
  return sortCaseStudiesByKey(caseStudies.filter(isPublicContent));
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
  return sortCaseStudiesByKey(
    caseStudies.filter(
      (c) => c.project_slug === projectSlug && isListedContent(c),
    ),
  );
}

export async function loadCaseStudyMdx(slug: string): Promise<CaseStudy> {
  const caseStudy = caseStudies.find((item) => item.slug === slug);

  if (!caseStudy) {
    throw new Error(`Case study "${slug}" not found`);
  }

  return caseStudy;
}

type ArrayCaseStudyKeys = {
  [K in keyof CaseStudy]: NonNullable<CaseStudy[K]> extends readonly string[]
    ? K
    : never;
}[keyof CaseStudy];

export async function loadCaseStudiesWhereArrayIncludes<
  K extends ArrayCaseStudyKeys,
>(key: K, value: string): Promise<CaseStudy[]> {
  return sortCaseStudiesByKey(
    caseStudies.filter((caseStudy) => {
      const field = caseStudy[key as keyof CaseStudy] as unknown as string[];

      return (
        Array.isArray(field) &&
        field.includes(value) &&
        isListedContent(caseStudy)
      );
    }),
  );
}

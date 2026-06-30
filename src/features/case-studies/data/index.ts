import { allCaseStudies } from 'content-collections';
import type { CaseStudy } from '@/types';
import { isListedContent } from '@/lib/content-visibility';

const caseStudies = (allCaseStudies as CaseStudy[]).filter(isListedContent);
const generafiMultitenancy = caseStudies.find(
  (study) => study.slug === 'generafi-multitenancy',
);
const synapcityInformationArchitecture = caseStudies.find(
  (study) => study.slug === 'synapcity-information-architecture',
);

export {
  caseStudies,
  generafiMultitenancy,
  synapcityInformationArchitecture,
  generafiMultitenancy as oneData,
  synapcityInformationArchitecture as twoData,
};

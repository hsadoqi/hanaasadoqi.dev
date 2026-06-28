import generafiPayrollRulesData from './final-studies/generafi-payroll-rules.json';
import moroccanFintechPlatformData from './final-studies/moroccan-fintech-platform-foundation.json';
import synapcityKnowledgeGraphData from './final-studies/synapcity-knowledge-graph.json';
import type { CaseStudy } from '@/types';

const defineCaseStudy = (data: unknown): CaseStudy => {
  const caseStudy = data as Partial<CaseStudy>;

  return {
    ...caseStudy,
    featured: caseStudy.featured ?? false,
    tags: caseStudy.tags ?? [],
    ctaItems: caseStudy.ctaItems ?? [],
    linkItems: caseStudy.linkItems ?? [],
  } as CaseStudy;
};

const generafiPayrollRules = defineCaseStudy(generafiPayrollRulesData);
const synapcityKnowledgeGraph = defineCaseStudy(synapcityKnowledgeGraphData);
const moroccanFintechPlatform = defineCaseStudy(moroccanFintechPlatformData);

const caseStudies: CaseStudy[] = [
  generafiPayrollRules,
  synapcityKnowledgeGraph,
  moroccanFintechPlatform,
];

export {
  caseStudies,
  generafiPayrollRules,
  moroccanFintechPlatform,
  synapcityKnowledgeGraph,
  generafiPayrollRules as oneData,
  synapcityKnowledgeGraph as twoData,
  moroccanFintechPlatform as threeData,
};

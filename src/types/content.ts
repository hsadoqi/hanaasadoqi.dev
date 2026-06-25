// Projects

export type StatusVariant = 'shipped' | 'in-progress' | 'concept';

export interface CaseStudy {
  title: string;
  status: string;
  statusVariant: StatusVariant;
  problem: string;
  role: string;
  focus: string[];
  proof: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface FeaturedCaseStudy extends Omit<
  CaseStudy,
  'focus' | 'proof' | 'ctaLabel' | 'ctaHref' | 'mobileWidth'
> {
  subtitle: string;
  solution: string;
  challenges: string[];
  techStack: string[];
  learnings: string[];
}

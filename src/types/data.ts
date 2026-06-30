import { ReactNode } from 'react';
import {
  ArtifactLink,
  BadgeVariant,
  HeroPropsType,
  StatusColorVariant,
  StatusType,
  TagVariant,
} from './components';
import { Cta, PresentationalSection } from './presentation';
import { PreviewCaseStudyProps, PreviewImage } from './preview';

export type ProjectItemType =
  | 'project'
  | 'case-study'
  | 'article'
  | 'experiment';

export type ProjectCategory =
  | 'product'
  | 'platform'
  | 'frontend'
  | 'full-stack'
  | 'design-system'
  | 'prototype'
  | 'research';

export type ProjectMaturity =
  | 'concept'
  | 'prototype'
  | 'active'
  | 'shipped'
  | 'archived';

export interface ProjectDates {
  year?: number;
  started?: string;
  ended?: string;
  published?: string;
  updated?: string;
}

export interface RelatedCaseStudy {
  title: string;
  slug: string;
  description: string;
  status?: StatusType;
  tags?: string[];
}

export interface TimelineItem {
  label: string;
  date?: string;
  description: string;
}

export interface CaseStudyCardProps {
  caseStudy: PreviewCaseStudyProps;
  statusVariant?: BadgeVariant;
  number: string;
  tagVariant?: TagVariant;
  metadata?: Array<{ label: string; value: string | ReactNode }>;
  caseStudyLink?: string | null;
  onLearnMore?: () => void;
  layout?: 'featured' | 'compact' | 'minimal';
}

export interface ProjectItem {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  type: ProjectItemType;
  category: ProjectCategory;
  featured: boolean;
  visibility: 'public' | 'hidden' | 'draft';
  maturity: ProjectMaturity;
  problem?: string;
  solution?: string;
  impact?: string;
  role?: string;
  proof?: string;
  status: {
    value: StatusType;
    variant: StatusColorVariant;
  };
  dates?: ProjectDates;
  readingTime?: {
    words: number;
    minutes: number;
    text: string;
  };
  tags: string[];
  scope?: string[];
  techStack?: string[];
  outcomes?: string[];
  challenges?: string[];
  learnings?: string[];
  sections: PresentationalSection[];
  mdx?: string;
  hero: HeroPropsType;
  images?: PreviewImage[];
  mobileWidth?: number;
  architecture?: {
    decisions?: number;
    diagrams?: number;
    services?: string[];
    patterns?: string[];
    highlights?: {
      title: string;
      description: string;
    }[];
  };
  caseStudies?: RelatedCaseStudy[];
  timeline?: TimelineItem[];
  ctaItems: Cta[];
  artifactLinks?: ArtifactLink[];
  isComingSoon?: boolean;
  isDisabled?: boolean;
}

export type BaseDataItem = ProjectItem;

export type CaseStudy = ProjectItem & {
  project_slug: string;
  problem?: string;
  solution?: string;
};

export type Project = ProjectItem & {
  relatedCaseStudies: string[];
};

export type Featured<T> = Omit<T, 'featured'> & {
  featured: true;
};

export type FeaturedCaseStudy = Featured<CaseStudy>;
export type FeaturedProject = Featured<Project>;

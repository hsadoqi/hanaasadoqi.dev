import { ReactNode } from 'react';
import {
  BadgeVariant,
  HeroPropsType,
  StatusColorVariant,
  StatusType,
  TagVariant,
} from './components';
import { AnyLink, Cta, PresentationalSection } from './presentation';
import { PreviewCaseStudyProps, PreviewImage } from './preview';

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

export interface BaseDataItem {
  featured: boolean;
  slug: string;
  title: string;
  subtitle: string;
  description?: string;
  problem?: string;
  solution?: string;
  status: {
    value: StatusType;
    variant: StatusColorVariant;
  };
  tags: string[];
  role?: string;
  proof?: string;
  hero: HeroPropsType;
  images?: PreviewImage[];
  sections: PresentationalSection[];
  mobileWidth?: number;
  techStack?: string[];
  learnings?: string[];
  challenges?: string[];
  ctaItems: Cta[];
  linkItems: AnyLink[];
  isComingSoon?: boolean;
  isDisabled?: boolean;
  impact?: string;
  startDate?: Date;
  endDate?: Date;
  lastUpdated?: Date;
  createdAt?: Date;
}

export type CaseStudy = BaseDataItem & {
  project_slug: string;
  problem?: string;
  solution?: string;
};

export type Project = BaseDataItem & {
  relatedCaseStudies: string[];
};

export type Featured<T> = Omit<T, 'featured'> & {
  featured: true;
};

export type FeaturedCaseStudy = Featured<CaseStudy>;
export type FeaturedProject = Featured<Project>;

import {
  BadgeVariant,
  HeroPropsType,
  StatusType,
  TagVariant,
} from './components';
import { CaseStudy } from './data';

export type PreviewCaseStudyProps = Pick<
  CaseStudy,
  'slug' | 'title' | 'subtitle' | 'status' | 'tags' | 'images'
>;

export type PreviewItem = {
  label: string;
  value: string;
};

export type PreviewStatus = {
  value: string;
  variant: BadgeVariant;
  number: string;
};

export type PreviewTags = {
  tagVariant: TagVariant;
  values: string[];
};

export type PreviewImage = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imageClassName?: string;
};

export type PreviewData = {
  slug: string;
  title: string;
  subtitle: string;
  description?: string;
  hero: HeroPropsType;
  items: [];
  link?: string;
  status: StatusType;
  tags: PreviewTags;
  images?: PreviewImage[];
};

export type CaseStudyPreviewData = PreviewData & {
  impact: string;
  problem: string;
  solution: string;
  projectSlug: string;
};

export type ProjectPreviewData = PreviewData & {
  relatedCaseStudies: string[];
};

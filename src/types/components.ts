import type { ImageProps } from 'next/image';

export type SectionVariant = 'default' | 'surface';
export type SectionAlign = 'start' | 'center' | 'end' | 'evenly' | 'stretch';
export type SectionJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'evenly'
  | 'stretch';
export type ConceptGroup = {
  name: string;
  description: string;
  concepts: string[];
};

export type AspectRatio = 'video' | 'square' | 'portrait' | 'custom';
export type BadgeVariant = 'primary' | 'muted' | 'accent';
export type TagVariant = 'tech' | 'focus';
export type StatusType =
  | 'brainstorming'
  | 'in-progress'
  | 'launched'
  | 'archived'
  | 'concept'
  | 'design'
  | 'development';
export type BadgeColor = 'blue' | 'green' | 'amber' | 'muted';
export type CalloutType = 'note' | 'warning' | 'discovery';

export type ImagePropsType = Pick<
  ImageProps,
  'src' | 'alt' | 'priority' | 'sizes' | 'onError' | 'width' | 'height'
> & {
  caption?: string;
  aspectRatio?: AspectRatio;
  className?: string;
  imageClassName?: string;
  label?: string;
  placeholder?: Extract<ImageProps['placeholder'], 'blur' | 'empty'>;
};

export type BadgePropsType = {
  text: string;
  color: BadgeColor;
  variant?: BadgeVariant;
};

export type HeroPropsType = {
  eyebrow: string;
  badges: BadgePropsType[];
  image: ImagePropsType;
};

export type StatusVariant =
  | 'launched'
  | 'in-progress'
  | 'concept'
  | 'brainstorming'
  | 'in-development'
  | 'archived'
  | 'design';

export type StatusColorVariant = 'blue' | 'green' | 'pink' | 'gray';

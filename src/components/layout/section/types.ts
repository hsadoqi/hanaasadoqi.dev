import { SectionAlign, SectionJustify } from '@/types/components';

export const alignMap: Record<SectionAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  evenly: 'items-evenly',
  stretch: 'items-stretch',
};

export const justifyMap: Record<SectionJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  evenly: 'justify-evenly',
  stretch: 'justify-stretch',
};

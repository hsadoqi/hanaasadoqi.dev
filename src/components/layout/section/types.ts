export type SectionVariant = 'default' | 'surface';
export type SectionAlign = 'start' | 'center' | 'end';
export type SectionJustify = 'start' | 'center' | 'end' | 'between';

export const alignMap: Record<SectionAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
};

export const justifyMap: Record<SectionJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
};

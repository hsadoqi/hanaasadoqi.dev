export const collapseMap = {
  sm: 'sm:not-sr-only',
  md: 'md:not-sr-only',
  lg: 'lg:not-sr-only',
} as const;

export const breakpointQueries = {
  sm: '(max-width: 639px)',
  md: '(max-width: 767px)',
  lg: '(max-width: 1023px)',
} as const;

export type CollapseAt = keyof typeof collapseMap;

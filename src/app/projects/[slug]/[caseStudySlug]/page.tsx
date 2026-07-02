import type { Metadata } from 'next';

import { generateMetadata as _generateMetadata } from '@/features/case-studies/components/views/case-studies-show';
export {
  default,
  generateStaticParams,
} from '@/features/case-studies/components/views/case-studies-show';

export const generateMetadata = _generateMetadata as (
  ...args: Parameters<typeof _generateMetadata>
) => Promise<Metadata>;

export const dynamicParams = false;

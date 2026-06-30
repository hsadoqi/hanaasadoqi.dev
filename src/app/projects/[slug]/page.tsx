import { generateMetadata as showGenerateMetadata } from '@/features/projects/page-layouts/show';
import type { Metadata } from 'next';

export {
  default,
  generateStaticParams,
} from '@/features/projects/page-layouts/show';

export async function generateMetadata(
  ...args: Parameters<typeof showGenerateMetadata>
): Promise<Metadata> {
  return await showGenerateMetadata(...args);
}

export const dynamicParams = false;

import { MDXContent as ContentCollectionsMDX } from '@content-collections/mdx/react';
import { mdxComponents } from './mdx-components';

export function MDXContent({ code }: { code: string }) {
  return <ContentCollectionsMDX code={code} components={mdxComponents} />;
}

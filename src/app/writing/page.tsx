import type { Metadata } from 'next';

import { WritingIndex, writingArticles } from '@/features/writing';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Notes and essays on product engineering, architecture, permissions, workflows, and systems thinking.',
};

export default function WritingPage() {
  return <WritingIndex articles={writingArticles} />;
}

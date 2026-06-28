import type { Metadata } from 'next';
import CaseStudiesIndexPage from '@/features/case-studies/page-layouts';

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Browse technical case studies across projects, filtered by project, status, and focus area.',
};

export default CaseStudiesIndexPage;

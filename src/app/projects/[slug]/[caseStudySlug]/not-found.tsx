import { EmptyState } from '@/components/shared';

export default function CaseStudyNotFound() {
  return (
    <EmptyState
      eyebrow="Case Study not found"
      title="This case study is not available."
      description="It may still be in draft or not part of the published case-studies index."
      action={{ href: '/case-studies', label: 'View all case studies →' }}
    />
  );
}

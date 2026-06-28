import { Tag } from '@/components/shared/badges/tag';

interface CaseStudyTagsProps {
  tags: string[];
}

export function CaseStudyTags({ tags }: CaseStudyTagsProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      aria-label="Project technologies and focus areas"
    >
      {tags.map((tag) => (
        <Tag key={tag} variant={'outline'} aria-label={tag}>
          {tag}
        </Tag>
      ))}
    </div>
  );
}

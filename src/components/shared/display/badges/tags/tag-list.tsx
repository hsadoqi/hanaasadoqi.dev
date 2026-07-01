import { Tag } from './tag';

type TagListProps = {
  tags: string[];
  'aria-label'?: string;
};

export function TagList({
  tags,
  'aria-label': ariaLabel = 'Tags',
}: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2" aria-label={ariaLabel}>
      {tags.map((tag) => (
        <Tag key={tag} variant="outline" aria-label={tag}>
          {tag}
        </Tag>
      ))}
    </div>
  );
}

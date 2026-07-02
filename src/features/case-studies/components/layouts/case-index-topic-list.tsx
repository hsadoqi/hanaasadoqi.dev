export function CaseStudyTopicList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.slice(0, 4).map((tag) => (
        <span
          key={tag}
          className="border-border/40 type-caption rounded-full border px-2.5 py-1"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

import type { ConceptItem } from '../types';
import ConceptMeta from './concept-meta';

export function ConceptDetail({
  item,
  eyebrow,
}: {
  item: ConceptItem;
  eyebrow: string;
}) {
  return (
    <article className="border-border/50 bg-muted/20 sticky top-24 rounded-2xl border p-6 sm:p-7">
      <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.18em] uppercase">
        {eyebrow}
      </p>
      <h3 className="font-heading text-foreground mt-3 text-3xl leading-tight font-semibold tracking-[-0.01em]">
        {item.title}
      </h3>
      <p className="text-muted-foreground mt-4 text-sm leading-7">
        {item.description}
      </p>
      <p className="border-border/30 text-muted-foreground/70 mt-5 border-l-2 pl-4 text-sm leading-7 italic">
        {item.example}
      </p>
      <div className="mt-6">
        <ConceptMeta item={item} />
      </div>
    </article>
  );
}

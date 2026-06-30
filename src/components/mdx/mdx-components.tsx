import type { ComponentProps, ReactNode } from 'react';
import {
  CalloutNote as BlockCalloutNote,
  ConstraintBlock,
  DecisionCard,
  DiagramPlaceholder,
  GalleryGrid,
  MetricCard,
  PullQuote as BlockPullQuote,
  ReflectionBlock,
  RenderSection,
  SectionMarker as BlockSectionMarker,
  SectionTitle,
  TimelineItem,
  TradeOffCard,
} from '@/components/shared/blocks';
import { cn } from '@/lib/utils';
import { CodeBlock, Pre } from './code-block';
import { MermaidDiagram } from './mermaid-diagram';

type BeforeAfterItem = {
  before: string;
  after: string;
};

export function BeforeAfter({ items }: { items: BeforeAfterItem[] }) {
  if (!items.length) return null;

  return (
    <div className="my-8 grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div
          key={`${item.before}-${item.after}`}
          className="border-border/40 bg-background/60 rounded-lg border p-4"
        >
          <p className="type-eyebrow mb-3">Before</p>
          <p className="type-body-sm text-secondary-content">{item.before}</p>

          <div className="border-border/30 my-4 border-t" />

          <p className="type-eyebrow mb-3">After</p>
          <p className="type-body-sm">{item.after}</p>
        </div>
      ))}
    </div>
  );
}

type InsightItem = {
  title: string;
  description: string;
};

export function InsightGrid({ items }: { items: InsightItem[] }) {
  if (!items.length) return null;

  return (
    <div className="my-8 grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.title}
          className="border-border/40 bg-muted/20 rounded-lg border p-5"
        >
          <h3 className="type-card-title mb-2">{item.title}</h3>
          <p className="type-body-sm text-secondary-content">
            {item.description}
          </p>
        </article>
      ))}
    </div>
  );
}

type ArchitectureHighlight = {
  title: string;
  problem: string;
  decision: string;
  result: string;
};

export function ArchitectureHighlightCard({
  title,
  problem,
  decision,
  result,
}: ArchitectureHighlight) {
  return (
    <article className="border-border/40 bg-background/60 my-8 rounded-xl border p-6">
      <h3 className="type-card-title mb-5">{title}</h3>

      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <p className="type-eyebrow mb-2">Problem</p>
          <p className="type-body-sm text-secondary-content">{problem}</p>
        </div>

        <div>
          <p className="type-eyebrow mb-2">Decision</p>
          <p className="type-body-sm text-secondary-content">{decision}</p>
        </div>

        <div>
          <p className="type-eyebrow mb-2">Result</p>
          <p className="type-body-sm text-secondary-content">{result}</p>
        </div>
      </div>
    </article>
  );
}

type SystemMapItem = {
  name: string;
  responsibility: string;
};

export function SystemMap({ items }: { items: SystemMapItem[] }) {
  if (!items.length) return null;

  return (
    <div className="my-8 space-y-3">
      {items.map((item, index) => (
        <div
          key={item.name}
          className="border-border/40 bg-background/60 flex gap-4 rounded-lg border p-4"
        >
          <span className="type-eyebrow text-muted-foreground">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="type-card-title">{item.name}</h3>
            <p className="type-body-sm text-secondary-content mt-1">
              {item.responsibility}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

type OutcomeItem = {
  label: string;
  description: string;
};

export function OutcomeList({ items }: { items: OutcomeItem[] }) {
  if (!items.length) return null;

  return (
    <div className="border-border/40 bg-muted/20 my-8 rounded-xl border p-6">
      <p className="type-eyebrow mb-5">Outcomes</p>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <h3 className="type-card-title">{item.label}</h3>
            <p className="type-body-sm text-secondary-content mt-1">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

type ImageItem = {
  src: string;
  alt: string;
  caption?: string;
};

type StatItem = {
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
};

type TimelineEntry = {
  date: string;
  title: string;
  description: string;
};

export function Callout({
  children,
  tone = 'note',
  title,
}: {
  children: ReactNode;
  tone?: 'note' | 'warning' | 'discovery';
  title?: string;
}) {
  return (
    <div className="my-6 space-y-2">
      {title && <p className="type-eyebrow mb-3">{title}</p>}
      <CalloutNote type={tone}>{children}</CalloutNote>
    </div>
  );
}

export function CalloutNote({
  children,
  type = 'note',
}: ComponentProps<typeof BlockCalloutNote>) {
  const styles = {
    note: 'border-border/40 bg-muted/20',
    warning: 'border-amber-500/30 bg-amber-500/5',
    discovery: 'border-blue-500/30 bg-blue-500/5',
  };

  return (
    <div className={`border-l-2 ${styles[type]} my-6 rounded-r px-4 py-3`}>
      <div className="type-body-sm space-y-3">{children}</div>
    </div>
  );
}

export function ProjectGallery({ images }: { images: ImageItem[] }) {
  return <ImageGrid images={images} columns={2} />;
}

export function ImageGrid({
  images,
  columns = 2,
}: {
  images: ImageItem[];
  columns?: 2 | 3;
}) {
  if (!images.length) return null;

  return (
    <div
      className={cn(
        'grid gap-4',
        columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2',
      )}
    >
      {images.map((image) => (
        <figure
          key={image.src}
          className="border-border/40 bg-background/50 overflow-hidden rounded-lg border"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} className="h-auto w-full" />
          {image.caption && (
            <figcaption className="type-caption border-border/30 border-t px-4 py-3">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

export function StatGrid({ stats }: { stats: StatItem[] }) {
  if (!stats.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <MetricCard
          key={`${stat.label}-${stat.value}`}
          label={stat.label}
          value={stat.value}
          unit={stat.unit}
        />
      ))}
    </div>
  );
}

export function MetricGrid({ metrics }: { metrics: StatItem[] }) {
  return <StatGrid stats={metrics} />;
}

export function Timeline({ items }: { items: TimelineEntry[] }) {
  if (!items.length) return null;

  return (
    <div className="space-y-0">
      {items.map((item) => (
        <TimelineItem
          key={`${item.date}-${item.title}`}
          date={item.date}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
}

export function ProcessDiagram({
  label,
  height = 360,
  caption,
}: ComponentProps<typeof DiagramPlaceholder>) {
  return <DiagramPlaceholder label={label} height={height} caption={caption} />;
}

export function TechStack({ items }: { items: string[] }) {
  if (!items.length) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="border-border/40 bg-background/60 text-secondary-content rounded border px-3 py-1 text-sm"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Decision(props: ComponentProps<typeof DecisionCard>) {
  return <DecisionCard {...props} />;
}

export function Constraint(props: ComponentProps<typeof ConstraintBlock>) {
  return <ConstraintBlock {...props} />;
}

export function TradeOff(props: ComponentProps<typeof TradeOffCard>) {
  return <TradeOffCard {...props} />;
}

export function Metric(props: ComponentProps<typeof MetricCard>) {
  return <MetricCard {...props} />;
}

export function Reflection(props: ComponentProps<typeof ReflectionBlock>) {
  return <ReflectionBlock {...props} />;
}

export function PullQuote({
  children,
  attribution,
}: ComponentProps<typeof BlockPullQuote>) {
  return (
    <blockquote className="border-border/40 my-8 space-y-3 border-l-2 py-4 pl-6">
      <div className="type-body-lg text-foreground/90 space-y-3 italic">
        {children}
      </div>
      {attribution && <footer className="type-caption">— {attribution}</footer>}
    </blockquote>
  );
}

export function Quote(props: ComponentProps<typeof BlockPullQuote>) {
  return <PullQuote {...props} />;
}

export function Diagram(props: ComponentProps<typeof DiagramPlaceholder>) {
  return <DiagramPlaceholder {...props} />;
}

export function SectionMarker({
  variant = 'divider',
  orientation = 'horizontal',
  contentPosition = 'before',
  tone = 'muted',
  ...props
}: ComponentProps<typeof BlockSectionMarker>) {
  return (
    <BlockSectionMarker
      variant={variant}
      orientation={orientation}
      contentPosition={contentPosition}
      tone={tone}
      {...props}
    />
  );
}

export function SectionRail(props: ComponentProps<typeof BlockSectionMarker>) {
  return <BlockSectionMarker {...props} />;
}

export const mdxComponents = {
  h2: (props: ComponentProps<'h2'>) => (
    <h2 className="type-section-title" {...props} />
  ),
  h3: (props: ComponentProps<'h3'>) => (
    <h3 className="type-card-title" {...props} />
  ),
  p: (props: ComponentProps<'p'>) => <p className="type-body" {...props} />,
  ul: (props: ComponentProps<'ul'>) => (
    <ul className="type-body list-disc space-y-2 pl-5" {...props} />
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <ol className="type-body list-decimal space-y-2 pl-5" {...props} />
  ),
  li: (props: ComponentProps<'li'>) => <li className="pl-1" {...props} />,
  pre: Pre,
  code: (props: ComponentProps<'code'>) => <code {...props} />,
  Callout,
  CalloutNote,
  Constraint,
  ConstraintBlock,
  Decision,
  DecisionCard,
  Diagram,
  DiagramPlaceholder,
  ProjectGallery,
  ImageGrid,
  CodeBlock,
  MermaidDiagram,
  StatGrid,
  MetricGrid,
  Timeline,
  TimelineItem,
  ProcessDiagram,
  TechStack,
  Metric,
  MetricCard,
  PullQuote,
  Quote,
  Reflection,
  ReflectionBlock,
  RenderSection,
  SectionMarker,
  SectionRail,
  SectionTitle,
  TradeOff,
  TradeOffCard,
  GalleryGrid,
  BeforeAfter,
  ArchitectureHighlightCard,
  SystemMap,
  OutcomeList,
  InsightGrid,
};

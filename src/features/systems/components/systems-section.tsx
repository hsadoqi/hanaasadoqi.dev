'use client';

import { useMemo, useState } from 'react';
import { Section } from '@/components/layout/section';

import { systemCards } from '../data';
import { cn } from '@/lib/utils';
import { ConceptGroup } from '@/types/components';
import type { SystemView, SystemCard } from '../types';

const views: Array<{
  id: SystemView;
  label: string;
  description: string;
}> = [
  {
    id: 'index',
    label: 'Index',
    description: 'Title-first concept map with one persistent detail panel.',
  },
  {
    id: 'glossary',
    label: 'Glossary',
    description:
      'Compact rows that expand only when a concept earns attention.',
  },
  {
    id: 'map',
    label: 'Linked map',
    description: 'Connects principles to projects and future writing.',
  },
  {
    id: 'proof',
    label: 'Proof-first',
    description: 'Uses concrete receipts as the actual interaction model.',
  },
];

const projectGroups: ConceptGroup[] = [
  {
    name: 'Generafi',
    description:
      'Payroll, accounting, compliance, permissions, audit history, and long-lived business rules.',
    concepts: [
      'Model the real workflow first',
      'Permissions are product decisions',
      'Edge cases reveal the system',
      'Auditability creates trust',
    ],
  },
  {
    name: 'Synapcity',
    description:
      'Knowledge structure, collaboration boundaries, discovery, and context preservation.',
    concepts: [
      'Model the real workflow first',
      'Permissions are product decisions',
      'Documentation is part of the product',
      'Ship useful before perfect',
    ],
  },
  {
    name: 'Internal tooling',
    description:
      'Operator workflows where reliability, speed, and trust matter more than surface novelty.',
    concepts: [
      'Reliability is a user experience',
      'Internal tools deserve care',
      'Ship useful before perfect',
    ],
  },
];

export function SystemsSection() {
  const [view, setView] = useState<SystemView>('index');
  const activeView = views.find((item) => item.id === view) ?? views[0];

  return (
    <Section
      id="systems"
      header={{
        eyebrow: 'Systems',
        title: 'A working index of how I think',
        description:
          'Four possible ways to turn principles into something more useful than a quote wall.',
      }}
    >
      <div className="space-y-8">
        <div
          className="border-border/40 bg-muted/20 grid gap-2 rounded-xl border p-1.5 sm:grid-cols-4"
          role="tablist"
          aria-label="Systems section concepts"
        >
          {views.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={view === item.id}
              onClick={() => setView(item.id)}
              className={cn(
                'rounded-lg px-3 py-3 text-left motion-safe:transition-all motion-safe:duration-200',
                'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
                view === item.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-background/60 hover:text-foreground',
              )}
            >
              <span className="block text-sm font-semibold">{item.label}</span>
              <span className="mt-1 block text-[11px] leading-relaxed opacity-70">
                {item.description}
              </span>
            </button>
          ))}
        </div>

        <p className="text-muted-foreground max-w-2xl text-sm leading-7">
          {activeView.description}
        </p>

        {view === 'index' && <ConceptIndex items={systemCards} />}
        {view === 'glossary' && <ConceptGlossary items={systemCards} />}
        {view === 'map' && (
          <ConceptLinkedMap groups={projectGroups} items={systemCards} />
        )}
        {view === 'proof' && <ConceptProofList items={systemCards} />}
      </div>
    </Section>
  );
}

function ConceptIndex({ items }: { items: SystemCard[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)] lg:items-start">
      <div className="space-y-1">
        {items.map((card, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={card.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              className={cn(
                'group border-border/30 flex w-full items-start gap-4 border-b border-l-2 px-3 py-4 text-left',
                'focus-visible:ring-ring rounded-lg focus-visible:ring-2 focus-visible:outline-none',
                'motion-safe:transition-all motion-safe:duration-200',
                isActive
                  ? 'border-l-brand bg-muted/30'
                  : 'hover:bg-muted/10 border-l-transparent',
              )}
              aria-pressed={isActive}
            >
              <span
                className={cn(
                  'text-muted-foreground/40 mt-1 font-mono text-[11px] tabular-nums',
                  isActive && 'text-muted-foreground/70',
                )}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className={cn(
                  'text-foreground block origin-left text-xl leading-tight font-semibold tracking-tight',
                  'group-hover:scale-[1.03] motion-safe:transition-transform motion-safe:duration-200 sm:text-2xl',
                  isActive && 'text-brand scale-[1.03]',
                )}
              >
                {card.title}
              </span>
            </button>
          );
        })}
      </div>

      <DetailPanel card={active} eyebrow="Selected lens" />
    </div>
  );
}

function ConceptGlossary({ items }: { items: SystemCard[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-border/40 border-border/40 overflow-hidden rounded-xl border">
      {items.map((card, index) => {
        const isOpen = index === openIndex;

        return (
          <article key={card.title} className="divide-border/30 divide-y">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="hover:bg-muted/20 focus-visible:ring-ring flex w-full items-center justify-between gap-6 p-5 text-left focus-visible:ring-2 focus-visible:outline-none motion-safe:transition-colors sm:p-6"
              aria-expanded={isOpen}
            >
              <span className="flex items-start gap-4">
                <span className="text-muted-foreground/40 mt-1 font-mono text-[11px] tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-foreground text-lg leading-tight font-semibold tracking-tight sm:text-xl">
                  {card.title}
                </span>
              </span>
              <span
                className={cn(
                  'text-muted-foreground motion-safe:transition-transform motion-safe:duration-200',
                  isOpen && 'rotate-45',
                )}
                aria-hidden="true"
              >
                +
              </span>
            </button>

            {isOpen && (
              <div className="grid gap-5 px-5 pb-6 sm:grid-cols-[1fr_0.75fr] sm:px-6">
                <p className="text-muted-foreground text-sm leading-7">
                  {card.description}
                </p>
                <MetaStack card={card} />
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

function ConceptLinkedMap({
  items,
  groups,
}: {
  items: SystemCard[];
  groups: ConceptGroup[];
}) {
  const [activeProject, setActiveProject] = useState(groups[0].name);
  const project =
    projectGroups.find((item) => item.name === activeProject) ??
    projectGroups[0];
  const relatedCards = items.filter((card) =>
    project.concepts.includes(card.title),
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <div className="space-y-3">
        {projectGroups.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setActiveProject(item.name)}
            className={cn(
              'border-border/40 w-full rounded-xl border p-4 text-left motion-safe:transition-all motion-safe:duration-200',
              'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
              item.name === activeProject
                ? 'bg-muted/30 text-foreground'
                : 'text-muted-foreground hover:border-border hover:bg-muted/20 hover:text-foreground',
            )}
          >
            <span className="block text-sm font-semibold">{item.name}</span>
            <span className="mt-2 block text-xs leading-6 opacity-75">
              {item.description}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-5">
        <div>
          <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.18em] uppercase">
            Concepts connected to {project.name}
          </p>
          <h3 className="text-foreground mt-2 text-2xl font-semibold tracking-tight">
            Principles become useful when they point somewhere.
          </h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {relatedCards.map((card) => (
            <article
              key={card.title}
              className="border-border/40 hover:border-border rounded-xl border p-5 motion-safe:transition-colors"
            >
              <h4 className="text-foreground text-base leading-snug font-semibold">
                {card.title}
              </h4>
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                {card.example}
              </p>
              <div className="mt-4">
                <TagList label="Writing hooks" items={card.writing} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConceptProofList({ items }: { items: SystemCard[] }) {
  const sortedCards = useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          b.projects.length +
          b.writing.length -
          (a.projects.length + a.writing.length),
      ),
    [items],
  );

  return (
    <div className="space-y-6">
      <div className="border-border/40 bg-muted/20 rounded-xl border p-5 sm:p-6">
        <p className="text-muted-foreground max-w-2xl text-sm leading-7">
          This version intentionally withholds explanation until a concept can
          be backed by a project, essay, or decision note. It is the harshest
          option, but probably the strongest long-term portfolio pattern.
        </p>
      </div>

      <div className="grid gap-4">
        {sortedCards.map((card, index) => (
          <article
            key={card.title}
            className="border-border/40 grid gap-5 rounded-xl border p-5 sm:grid-cols-[1fr_280px] sm:p-6"
          >
            <div>
              <p className="text-muted-foreground/40 font-mono text-[11px] tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="text-foreground mt-2 text-xl leading-tight font-semibold tracking-tight">
                {card.title}
              </h3>
              <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-7">
                {card.example}
              </p>
            </div>
            <MetaStack card={card} />
          </article>
        ))}
      </div>
    </div>
  );
}

function DetailPanel({ card, eyebrow }: { card: SystemCard; eyebrow: string }) {
  return (
    <article className="border-border/50 bg-muted/20 sticky top-24 rounded-2xl border p-6 sm:p-7">
      <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.18em] uppercase">
        {eyebrow}
      </p>
      <h3 className="text-foreground mt-3 text-2xl leading-tight font-semibold tracking-tight">
        {card.title}
      </h3>
      <p className="text-muted-foreground mt-4 text-sm leading-7">
        {card.description}
      </p>
      <p className="border-border/30 text-muted-foreground/70 mt-5 border-l-2 pl-4 text-sm leading-7 italic">
        {card.example}
      </p>
      <div className="mt-6">
        <MetaStack card={card} />
      </div>
    </article>
  );
}

function MetaStack({ card }: { card: SystemCard }) {
  return (
    <div className="space-y-4">
      <TagList label="Seen in" items={card.projects} />
      <TagList label="Could link to" items={card.writing} />
    </div>
  );
}

function TagList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="text-muted-foreground/50 mb-2 text-[11px] font-semibold tracking-[0.14em] uppercase">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="border-border/50 text-muted-foreground rounded-full border px-2.5 py-1 text-[11px] leading-none"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

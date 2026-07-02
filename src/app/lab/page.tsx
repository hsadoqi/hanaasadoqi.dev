import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Lab',
  description:
    'Internal component playground index for blocks, forms, display, and concepts.',
};

type LabLink = {
  href: string;
  title: string;
  description: string;
};

const labLinks: LabLink[] = [
  {
    href: '/lab/blocks',
    title: 'Blocks Playground',
    description:
      'Storytelling and case-study block components like decisions, constraints, and callouts.',
  },
  {
    href: '/lab/forms',
    title: 'Forms Playground',
    description:
      'Search, filters, sort, and view controls used in index and browse interfaces.',
  },
  {
    href: '/lab/display',
    title: 'Display Playground',
    description:
      'Badges, cards, media, and show-view display primitives for content and project pages.',
  },
  {
    href: '/lab/concepts',
    title: 'Concepts Playground',
    description:
      'Concept browser layouts, glossary interactions, proof ranking, and metadata blocks.',
  },
];

export default function LabPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <p className="type-eyebrow">Internal Tools</p>
        <h1 className="type-display">Lab</h1>
        <p className="type-body-sm text-muted-foreground max-w-2xl">
          Component playground index for visual checks while coding. Open a
          surface below to iterate on behavior, spacing, and composition.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {labLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border-border/30 bg-background/50 hover:border-border/60 hover:bg-muted/20 focus-visible:ring-ring rounded-xl border p-5 focus-visible:ring-2 focus-visible:outline-none motion-safe:transition-colors"
          >
            <h2 className="type-card-title-sm">{item.title}</h2>
            <p className="type-body-sm text-muted-foreground mt-2">
              {item.description}
            </p>
            <p className="type-caption mt-4 font-medium">Open {item.href} →</p>
          </Link>
        ))}
      </section>
    </main>
  );
}

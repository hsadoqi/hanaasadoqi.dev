import {
  ConceptBrowser,
  ConceptConnectionMap,
  ConceptGlossary,
  ConceptMeta,
  ConceptMetaTags,
  ConceptProofRanking,
  ConceptReceiptList,
  SelectedConceptPanel,
} from '@/features/concepts/components';
import type { ConceptGroup, ConceptItem } from '@/features/concepts/types';

export const metadata = {
  title: 'Concepts Playground',
  description: 'Live preview playground for concepts feature components.',
};

const sectionClass = 'border-border/30 rounded-xl border p-6 sm:p-8';

const demoConceptItems: ConceptItem[] = [
  {
    title: 'Tenant boundary by default',
    description:
      'Tenant identity is a first-class domain concept and enforced at policy and query boundaries.',
    example:
      'Every read and write path requires explicit tenant context before touching business records.',
    projects: ['Generafi', 'Synapcity'],
    writing: ['RLS mental model', 'Boundary-first architecture notes'],
    receipts: [
      {
        label: 'Policy test suite',
        type: 'test',
        status: 'available',
        href: '/projects/generafi',
      },
      {
        label: 'Boundary mapping draft',
        type: 'note',
        status: 'draft',
      },
      {
        label: 'Isolation benchmark',
        type: 'experiment',
        status: 'planned',
      },
    ],
  },
  {
    title: 'Receipts over claims',
    description:
      'A concept is only production-ready when there are links proving it in implementation, tests, or writing.',
    example:
      'Each principle card references at least one case study section or artifact.',
    projects: ['Moroccan Fintech'],
    writing: ['Decision logs', 'Proof ranking method'],
    receipts: [
      {
        label: 'Case study appendix',
        type: 'case-study',
        status: 'available',
        href: '/case-studies',
      },
      {
        label: 'Proof schema',
        type: 'spec',
        status: 'available',
        href: '/projects',
      },
    ],
  },
  {
    title: 'Interface follows domain',
    description:
      'UI sections mirror the domain decomposition so navigation and language reinforce architecture.',
    example:
      'Project index controls map to domain facets instead of visual-only categories.',
    projects: ['Synapcity', 'Generafi'],
    writing: ['Information architecture notes'],
    receipts: [
      {
        label: 'Navigation taxonomy notes',
        type: 'note',
        status: 'draft',
      },
      {
        label: 'Refactor checklist',
        type: 'checklist',
        status: 'planned',
      },
    ],
  },
];

const demoConceptGroups: ConceptGroup[] = [
  {
    name: 'Data boundaries',
    description:
      'Isolation, ownership, and compliance boundaries in shared systems.',
    concepts: ['Tenant boundary by default', 'Receipts over claims'],
  },
  {
    name: 'Product architecture',
    description:
      'How information architecture and UI structure align with domain logic.',
    concepts: ['Interface follows domain', 'Receipts over claims'],
  },
  {
    name: 'Delivery discipline',
    description:
      'How principles are validated through artifacts and test evidence.',
    concepts: ['Receipts over claims', 'Tenant boundary by default'],
  },
];

export default function ConceptsPlaygroundPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <p className="type-eyebrow">Component Playground</p>
        <h1 className="type-display">Concepts Feature</h1>
        <p className="type-body-sm text-muted-foreground max-w-2xl">
          Live previews for concepts components, including browser, glossary,
          connection map, ranking, and concept metadata primitives.
        </p>
      </header>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">ConceptBrowser</h2>
        <ConceptBrowser items={demoConceptItems} />
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">SelectedConceptPanel</h2>
        <SelectedConceptPanel
          item={demoConceptItems[0]}
          eyebrow="Selected lens"
        />
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">ConceptConnectionMap</h2>
        <ConceptConnectionMap
          groups={demoConceptGroups}
          items={demoConceptItems}
        />
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">ConceptGlossary</h2>
        <ConceptGlossary items={demoConceptItems} />
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">ConceptProofRanking</h2>
        <ConceptProofRanking items={demoConceptItems} />
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">ConceptMeta and subcomponents</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="border-border/30 rounded-lg border p-4">
            <ConceptMeta item={demoConceptItems[1]} />
          </div>

          <div className="space-y-4">
            <div className="border-border/30 rounded-lg border p-4">
              <ConceptMetaTags
                label="Writing hooks"
                items={demoConceptItems[2].writing}
              />
            </div>
            <div className="border-border/30 rounded-lg border p-4">
              <ConceptReceiptList receipts={demoConceptItems[0].receipts} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

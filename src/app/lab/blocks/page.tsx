'use client';

import {
  CalloutNote,
  ConstraintBlock,
  DecisionCard,
  DiagramPlaceholder,
  GalleryGrid,
  MetricCard,
  PullQuote,
  ReflectionBlock,
  SectionMarker,
  SectionTitle,
  TimelineItem,
  TradeOffCard,
} from '@/components/shared/blocks';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Blocks Playground',
//   description: 'Live preview playground for shared block components.',
// };

const sectionClass = 'border-border/30 rounded-xl border p-6 sm:p-8';

export default function BlocksPlaygroundPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <p className="type-eyebrow">Component Playground</p>
        <h1 className="type-display">Shared Blocks</h1>
        <p className="type-body-sm text-muted-foreground max-w-2xl">
          Live previews for block components used in case studies and writing.
          Use this route while coding to inspect spacing, hierarchy, and visual
          behavior.
        </p>
      </header>

      <section className={sectionClass}>
        <SectionTitle subtitle="Section heading with optional supporting text">
          SectionTitle
        </SectionTitle>
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">PullQuote</h2>
        <PullQuote attribution="Engineering Lead">
          Tenant identity belongs in the data model and every query boundary.
        </PullQuote>
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">DecisionCard</h2>
        <DecisionCard
          title="How should tenant isolation work?"
          teaser="Shared infrastructure keeps cost down but payroll data needs strict boundaries."
          answer="Tenant context lives in the model and every query boundary, enforced by policy and tests."
          alternatives={[
            'Database-per-tenant for every customer',
            'Application-only filtering in controllers',
          ]}
        />
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">ConstraintBlock</h2>
        <ConstraintBlock
          title="Regulatory data retention"
          description="Payroll records require auditable retention windows and immutable event history."
          impactSummary={[
            'Storage model',
            'Export pipeline',
            'Delete workflow',
          ]}
        />
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">TradeOffCard</h2>
        <TradeOffCard
          title="Shared database vs isolated database"
          optionA="Shared database with strict row-level security"
          optionB="Database per tenant"
          chosen="A"
          rationale="Lower operational complexity at current scale while keeping boundaries explicit."
          consequences="Higher policy and testing complexity."
          revisitTrigger="50+ enterprise tenants or hard regulatory partition requirements"
        />
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">DiagramPlaceholder</h2>
        <DiagramPlaceholder
          label="Tenant isolation architecture"
          height={320}
          caption="Replace with Mermaid or final system diagram"
        />
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">TimelineItem</h2>
        <div className="space-y-0">
          <TimelineItem
            date="Jan 2026"
            title="Discovery"
            description="Mapped constraints before implementation."
          />
          <TimelineItem
            date="Mar 2026"
            title="Architecture"
            description="Established tenant boundaries and domain rules."
          />
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">MetricCard</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="P95 Latency" value={230} unit="ms" />
          <MetricCard label="Automation Coverage" value={86} unit="%" />
          <MetricCard label="Rule Runs" value={1200} unit="/day" />
          <MetricCard label="Defect Escape" value={0.7} unit="%" />
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">ReflectionBlock</h2>
        <ReflectionBlock
          title="What surprised us"
          insight="Most complexity lived in cross-tenant edge cases, not in the core happy path."
          transferable="Model boundary cases before decomposing features."
        />
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">CalloutNote</h2>
        <CalloutNote type="note">
          Keep callouts short and use them for context, not full paragraphs.
        </CalloutNote>
        <CalloutNote type="warning">
          Avoid using warning tone for non-critical guidance.
        </CalloutNote>
        <CalloutNote type="discovery">
          Production-like seed data revealed hidden policy conflicts early.
        </CalloutNote>
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">SectionMarker</h2>
        <div className="space-y-6">
          <SectionMarker variant="divider" text="Architecture" tone="muted" />
          <div className="border-border/40 h-40 rounded-lg border border-dashed p-4">
            <SectionMarker text="Case Study" tone="default" />
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">GalleryGrid</h2>
        <GalleryGrid
          columns={3}
          items={[
            { label: 'Dashboard', caption: 'Tenant overview' },
            { label: 'Rules Engine', caption: 'Policy setup' },
            { label: 'Audit Trail', caption: 'Immutable events' },
          ]}
        />
      </section>
    </main>
  );
}

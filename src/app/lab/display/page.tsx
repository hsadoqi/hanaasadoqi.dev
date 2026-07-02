'use client';

import {
  BeforeAfterSlider,
  CardMedia,
  ContentShowHero,
  DefinitionItem,
  FeaturedBadge,
  ImageCarouselOnHover,
  ImageCollageContainer,
  ImageFrame,
  ImageGalleryGrid,
  Pill,
  PillList,
  PrincipleCard,
  RevealOnScroll,
  StatusBadge,
  Tag,
  TagList,
} from '@/components/shared/display';
import {
  CardBase,
  CardFeatured,
  CardQuiet,
  CardStandard,
} from '@/components/shared/display/cards/card-base';
import { ContentShowContent } from '@/components/shared/display/views/show-view/content-show-content';
import { HorizontalImageCarousel } from '@/components/shared/display/images/horizontal-image-carousel';
import {
  getLayoutClasses,
  type ImageLayoutPreset,
} from '@/components/shared/display/collage-layout';
import { useMemo, useState } from 'react';

const sectionClass = 'border-border/30 rounded-xl border p-6 sm:p-8';

const demoImages = [
  { src: '/artifacts/example/hero.png', alt: 'Hero artifact' },
  { src: '/artifacts/example/dashboard.png', alt: 'Dashboard artifact' },
  {
    src: '/artifacts/synapcity/synapcity-widgets.png',
    alt: 'Synapcity widgets',
  },
];

export default function DisplayPlaygroundPage() {
  const [preset, setPreset] = useState<ImageLayoutPreset>('featured-detail');

  const layoutSample = useMemo(() => {
    return [0, 1, 2]
      .map((index) => ({
        index,
        config: getLayoutClasses(preset, index, 360),
      }))
      .filter((entry) => entry.config !== null);
  }, [preset]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <p className="type-eyebrow">Component Playground</p>
        <h1 className="type-display">Shared Display</h1>
        <p className="type-body-sm text-muted-foreground max-w-2xl">
          Live previews for badges, cards, media, and show-view display
          primitives.
        </p>
      </header>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">Badges, Pills, and Tags</h2>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status="in-progress">in-progress</StatusBadge>
          <FeaturedBadge status="in-progress" />
          <Pill variant="focus">Knowledge Management</Pill>
          <Tag variant="outline">React</Tag>
        </div>
        <div className="mt-4 space-y-3">
          <PillList items={['Fintech', 'Compliance', 'Automation']} limit={2} />
          <TagList tags={['Typescript', 'Next.js', 'PostgreSQL']} />
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">Card primitives</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <CardQuiet>
            <p className="type-card-title-sm">CardQuiet</p>
            <p className="type-body-sm">Low-emphasis supporting card.</p>
          </CardQuiet>
          <CardStandard>
            <p className="type-card-title-sm">CardStandard</p>
            <p className="type-body-sm">Default content card treatment.</p>
          </CardStandard>
          <CardFeatured>
            <p className="type-card-title-sm">CardFeatured</p>
            <p className="type-body-sm">
              Elevated treatment for hero surfaces.
            </p>
          </CardFeatured>
        </div>
        <div className="mt-4">
          <CardBase
            variant="featured"
            size="lg"
            responsive="compact"
            interactive
          >
            <p className="type-card-title-sm">CardBase (custom)</p>
            <p className="type-body-sm">
              Use size/variant/responsive combos directly.
            </p>
          </CardBase>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">PrincipleCard + DefinitionItem</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <PrincipleCard
            title="Model before UI"
            description="Design explicit domain boundaries before composing interface layers."
            businessContext="Reduced regressions while scaling product complexity"
            index={1}
            variant="featured"
          />
          <dl className="border-border/30 space-y-4 rounded-lg border p-5">
            <DefinitionItem label="Status" value="In progress" />
            <DefinitionItem label="Updated" value="2026-07-01" />
            <DefinitionItem label="Reading time" value="4 min" />
          </dl>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">RevealOnScroll</h2>
        <RevealOnScroll
          className="border-border/30 rounded-lg border p-4"
          direction="up"
          delay={120}
        >
          <p className="type-body-sm">
            This block animates into view once it enters the viewport.
          </p>
        </RevealOnScroll>
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">Image components</h2>
        <div className="space-y-6">
          <CardMedia
            src="/artifacts/example/hero.png"
            alt="Card media example"
            className="max-w-xl"
          />

          <BeforeAfterSlider
            before={{
              src: '/artifacts/example/hero.png',
              alt: 'Before',
              label: 'Before',
            }}
            after={{
              src: '/artifacts/example/dashboard.png',
              alt: 'After',
              label: 'After',
            }}
            label="Before and after"
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <HorizontalImageCarousel
              images={demoImages}
              className="aspect-video"
            />
            <ImageCarouselOnHover
              images={demoImages}
              alt="Hover carousel"
              className="aspect-video"
            />
          </div>

          <ImageFrame
            src="/artifacts/synapcity/synapcity-tasks.png"
            alt="Image frame example"
            caption="ImageFrame with caption"
            aspectRatio="video"
            showCaption
          />

          <ImageCollageContainer
            images={[
              {
                src: '/artifacts/example/hero.png',
                alt: 'Primary artifact',
                caption: 'Primary view',
              },
              {
                src: '/artifacts/example/dashboard.png',
                alt: 'Detail artifact',
                caption: 'Detail A',
              },
              {
                src: '/artifacts/synapcity/synapcity-widgets.png',
                alt: 'Detail artifact two',
                caption: 'Detail B',
              },
            ]}
            variant="stack"
            aria-label="Collage example"
          />

          <ImageGalleryGrid images={demoImages} columns={3} />
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">Show-view primitives</h2>
        <div className="space-y-6">
          <ContentShowHero
            eyebrow="Case Study"
            title="Multi-tenant architecture"
            subtitle="How a shared infra model stayed compliant under strict domain boundaries."
            meta="Updated Jul 1, 2026 · 4 min read"
            badges={[
              { text: 'in-progress', color: 'blue' },
              { text: 'design-system', color: 'amber' },
            ]}
          />

          <ContentShowContent
            cards={[
              {
                id: 'impact',
                label: 'Impact',
                body: 'Reduced policy drift by centralizing rule evaluation and audit trails.',
              },
              {
                id: 'scope',
                label: 'Scope',
                body: 'Tenant model, access boundaries, and product-level compliance workflows.',
              },
            ]}
            linkItems={[
              {
                href: '/projects',
                label: 'Back to projects',
                isExternal: false,
                isDisabled: false,
                kind: 'project',
              },
            ]}
          >
            <p className="type-body-sm">
              ContentShowContent can host cards, links, MDX body, and
              presentational sections.
            </p>
          </ContentShowContent>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">
          Collage layout presets (debug view)
        </h2>
        <div className="mb-3 flex flex-wrap gap-2">
          {(
            ['featured-detail', 'staggered-top', 'staggered-bottom'] as const
          ).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setPreset(value)}
              className={`rounded border px-3 py-1 text-xs ${
                preset === value
                  ? 'border-foreground/40 bg-foreground/10 text-foreground'
                  : 'border-border/40 text-muted-foreground'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
        <pre className="bg-muted/20 border-border/30 overflow-auto rounded-lg border p-4 text-xs">
          {JSON.stringify(layoutSample, null, 2)}
        </pre>
      </section>
    </main>
  );
}

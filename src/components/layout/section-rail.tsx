'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ListIcon } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { useScrollSpy } from '@/hooks/use-scroll-spy';

type SectionRailLink = {
  id: string;
  label: string;
};

const sectionRailByPathname: Record<string, SectionRailLink[]> = {
  '/': [
    { id: 'projects', label: 'Projects' },
    { id: 'writing', label: 'Writing' },
    { id: 'experience', label: 'Experience' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ],
  '/projects': [
    { id: 'overview', label: 'Overview' },
    { id: 'filters', label: 'Filters' },
    { id: 'featured', label: 'Featured' },
    { id: 'all-projects', label: 'All Projects' },
  ],
  '/case-studies': [
    { id: 'overview', label: 'Overview' },
    { id: 'filters', label: 'Filters' },
    { id: 'topics', label: 'Topics' },
    { id: 'all-case-studies', label: 'All Case Studies' },
  ],
  '/writing': [
    { id: 'overview', label: 'Overview' },
    { id: 'filters', label: 'Filters' },
    { id: 'topics', label: 'Topics' },
    { id: 'all-writing', label: 'All Writing' },
  ],
};

function getSectionLinks(pathname: string) {
  return sectionRailByPathname[pathname] ?? [];
}

function SectionRailItems({
  activeId,
  links,
  onSelect,
}: {
  activeId: string;
  links: SectionRailLink[];
  onSelect?: () => void;
}) {
  return (
    <ul className="space-y-1">
      {links.map((link) => {
        const isActive = activeId === link.id;

        return (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              onClick={onSelect}
              aria-current={isActive ? 'location' : undefined}
              className={cn(
                'group text-muted-foreground hover:text-foreground focus-visible:ring-ring flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none',
                isActive && 'text-foreground font-semibold',
              )}
            >
              <span
                className={cn(
                  'bg-border h-4 w-0.5 rounded-full transition-colors',
                  isActive ? 'bg-brand' : 'group-hover:bg-muted-foreground',
                )}
                aria-hidden="true"
              />
              <span>{link.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function SectionRail() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const desktopRailRef = useRef<HTMLDivElement | null>(null);
  const links = useMemo(() => getSectionLinks(pathname), [pathname]);
  const sectionIds = useMemo(() => links.map((link) => link.id), [links]);
  const { activeId, hasReachedSections } = useScrollSpy(
    sectionIds,
    links.length > 0,
  );

  useEffect(() => {
    let lastY = window.scrollY;

    function handleScroll() {
      const currentY = window.scrollY;

      if (currentY > lastY + 8) {
        setDesktopOpen(false);
      }

      lastY = currentY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!desktopOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        desktopRailRef.current &&
        !desktopRailRef.current.contains(event.target as Node)
      ) {
        setDesktopOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [desktopOpen]);

  if (links.length === 0) return null;

  return (
    <>
      <div
        ref={desktopRailRef}
        aria-label="Page sections"
        className={cn(
          'fixed top-28 right-5 z-30 hidden transition-opacity duration-200 lg:block',
          hasReachedSections && links.length > 1
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      >
        <button
          type="button"
          onClick={() => setDesktopOpen((open) => !open)}
          className={cn(
            'border-border/40 bg-background/85 text-muted-foreground hover:border-border/70 hover:text-foreground focus-visible:ring-ring ml-auto flex items-center gap-2 rounded-md border px-3 py-2 text-xs font-semibold shadow-sm backdrop-blur transition-colors focus-visible:ring-2 focus-visible:outline-none',
            desktopOpen && 'border-border/70 text-foreground',
          )}
          aria-expanded={desktopOpen}
          aria-controls="section-rail-panel"
        >
          <ListIcon className="size-3.5" />
          <span>Page</span>
        </button>

        {desktopOpen ? (
          <nav
            id="section-rail-panel"
            className="border-border/35 bg-background/85 mt-2 w-40 rounded-md border px-2 py-2 shadow-sm backdrop-blur"
          >
            <p className="text-muted-foreground/60 px-2 pb-1 font-mono text-[10px] tracking-[0.2em] uppercase">
              On This Page
            </p>
            <SectionRailItems
              activeId={activeId}
              links={links}
              onSelect={() => setDesktopOpen(false)}
            />
          </nav>
        ) : null}
      </div>

      <div
        className={cn(
          'fixed right-4 bottom-4 z-40 lg:hidden',
          hasReachedSections ? 'block' : 'hidden',
        )}
      >
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="bg-background/95 text-foreground border-border hover:border-brand focus-visible:ring-ring inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold shadow-lg backdrop-blur transition-colors focus-visible:ring-2 focus-visible:outline-none"
              aria-label="Open page sections"
            >
              <ListIcon className="size-4" />
              <span>On this page</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[75dvh] p-0">
            <SheetHeader className="border-border/40 border-b px-5 py-4">
              <SheetTitle>On this page</SheetTitle>
            </SheetHeader>
            <nav className="p-4" aria-label="Page sections">
              <SectionRailItems
                activeId={activeId}
                links={links}
                onSelect={() => setMobileOpen(false)}
              />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

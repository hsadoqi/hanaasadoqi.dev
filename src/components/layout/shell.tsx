import { Navbar } from './navbar';
import { Footer } from './footer';
import { Providers } from './providers';
import { SectionRail } from './section-rail';
import { SkipLink } from '@/components/shared';

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="bg-background text-foreground flex min-h-dvh flex-col">
        <SkipLink />
        <Navbar />
        <SectionRail />
        <div className="flex flex-1 flex-col pt-16">{children}</div>
        <Footer />
      </div>
    </Providers>
  );
}

import { Navbar } from './navbar';
import { Footer } from './footer';
import { Providers } from './providers';
import { SkipLink } from '@/components/shared';

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="bg-background text-foreground flex min-h-dvh flex-col">
        <SkipLink />
        <Navbar />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </div>
    </Providers>
  );
}

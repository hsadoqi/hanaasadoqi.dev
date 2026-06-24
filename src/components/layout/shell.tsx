'use client';

import { Navbar } from './navbar';
import { Footer } from './footer';
import { ThemeProvider } from '@/components/shared/theme/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <div className="bg-background text-foreground flex min-h-screen flex-col">
          <Navbar />
          <div className="flex w-full flex-1 flex-col">{children}</div>
          <Footer />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}

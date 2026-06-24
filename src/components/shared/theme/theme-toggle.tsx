'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  if (!resolvedTheme) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn('bg-muted/80 text-foreground', className)}
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="size-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === 'dark';
  const Icon = isDark ? Sun : Moon;
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('bg-muted/80 text-foreground', className)}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={label}
    >
      <Icon className="size-4" />
    </Button>
  );
}

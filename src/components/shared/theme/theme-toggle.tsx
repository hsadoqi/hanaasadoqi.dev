'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function useIsMounted() {
  return useSyncExternalStore(
    () => () => { },
    () => true,
    () => false,
  );
}

export const useThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsMounted();

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return { isDark, toggleTheme, mounted };
}

export function ThemeToggle({ className }: { className?: string }) {
  const { isDark, toggleTheme, mounted } = useThemeToggle();

  if (!mounted) {
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

  const Icon = isDark ? Sun : Moon;
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'bg-muted/80 text-foreground hover:border-brand group border border-transparent transition-[colors,border] duration-200 ease-in-out',
        className,
      )}
      onClick={toggleTheme}
      aria-label={label}
    >
      <Icon className="group-hover:text-brand size-4 transition-colors" />
    </Button>
  );
}

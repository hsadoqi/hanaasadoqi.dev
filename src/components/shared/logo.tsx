import Link from 'next/link';

import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        '-m-3 inline-flex items-center gap-0.5 rounded-md px-3 py-2 text-xl font-semibold tracking-tight transition',
        'hover:bg-muted hover:text-foreground',
        'focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className,
      )}
      aria-label="hanaa. — home"
    >
      hanaa
      <span className="text-brand mt-0.5 font-extrabold">.</span>
    </Link>
  );
}

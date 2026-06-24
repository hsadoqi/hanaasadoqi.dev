import Link from 'next/link';

export function SkipLink({
  href = '#main-content',
  label = 'Skip to main content',
}: {
  href?: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="focus:bg-accent focus:text-accent-foreground sr-only absolute top-[-999px] left-[-999px] z-[9999] focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-md focus:px-4 focus:py-2 focus:outline-none"
    >
      {label}
    </Link>
  );
}

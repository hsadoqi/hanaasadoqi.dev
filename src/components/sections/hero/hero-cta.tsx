import Link from 'next/link';

export const HeroCta = ({ cta }: { cta: string }) => {
  return (
    <Link
      href="#projects"
      className="group type-eyebrow text-foreground hover:text-brand focus-visible:text-brand inline-flex max-w-full items-center gap-3 rounded-sm whitespace-nowrap outline-offset-4 active:translate-y-px motion-safe:transition-all motion-safe:duration-200 md:flex-col md:gap-2 md:text-sm"
    >
      <span>{cta}</span>
      <span className="group-hover:translate-y-1 group-focus-visible:translate-y-1 motion-safe:transition-transform motion-safe:duration-200">
        ↓
      </span>
    </Link>
  );
};

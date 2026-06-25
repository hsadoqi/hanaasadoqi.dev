import { Section } from '@/components/layout';
import React from 'react';

interface SectionWrapperProps extends React.ComponentProps<
  React.PropsWithChildren<typeof Section>
> {
  subtitle?: string;
  className?: string;
  headingClassName?: string;
  subtitleClassName?: string;
}

export function SectionWrapper({
  children,
  eyebrow = '',
  title = '',
  subtitle,
  className = '',
  headingClassName = '',
  subtitleClassName = '',
}: SectionWrapperProps) {
  return (
    <section
      className={`border-border/30 border-t py-20 sm:py-28 ${className}`}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-4">
          {eyebrow && (
            <p className="text-foreground/60 text-xs font-medium tracking-[0.12em] uppercase">
              {eyebrow}
            </p>
          )}

          <div className="flex items-center gap-3">
            <h2
              className={`text-3xl font-semibold sm:text-4xl ${headingClassName}`}
            >
              {title}
            </h2>
            <div className="bg-foreground/20 h-px w-8" />
          </div>

          {subtitle && (
            <p
              className={`text-foreground/60 max-w-2xl text-[13px] sm:text-sm ${subtitleClassName}`}
            >
              {subtitle}
            </p>
          )}
        </div>

        {children}
      </div>
    </section>
  );
}

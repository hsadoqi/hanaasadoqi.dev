import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const tagVariants = cva(
  'inline-flex h-6 w-fit shrink-0 items-center gap-1 rounded-md border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-colors [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        default: 'border-border bg-muted text-muted-foreground',
        solid: 'bg-foreground/10 text-foreground',
        outline: 'border-border text-foreground',
      },
      interactive: {
        true: 'cursor-pointer hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: false,
    },
  },
);

type TagProps = VariantProps<typeof tagVariants> & {
  className?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLSpanElement>;
};

export function Tag({
  className,
  variant,
  interactive,
  asChild = false,
  onClick,
  children,
  ...props
}: TagProps) {
  const isInteractive = interactive ?? !!onClick;

  if (asChild) {
    return (
      <Slot.Root
        data-slot="tag"
        className={cn(
          tagVariants({ variant, interactive: isInteractive }),
          className,
        )}
        {...props}
      >
        {children}
      </Slot.Root>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        data-slot="tag"
        className={cn(tagVariants({ variant, interactive: true }), className)}
        onClick={onClick}
        {...(props as React.ComponentProps<'button'>)}
      >
        {children}
      </button>
    );
  }

  return (
    <span
      data-slot="tag"
      className={cn(tagVariants({ variant, interactive: false }), className)}
      {...(props as React.ComponentProps<'span'>)}
    >
      {children}
    </span>
  );
}

export { tagVariants };

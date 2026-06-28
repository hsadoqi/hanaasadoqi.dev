import { cn } from '@/lib/utils';

type CardSize = 'sm' | 'md' | 'lg';
type CardVariant = 'quiet' | 'standard' | 'featured';
type CardResponsive = 'none' | 'compact' | 'default' | 'spacious';

interface CardBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual hierarchy tier */
  size?: CardSize;
  /** Visual treatment and interactivity level */
  variant?: CardVariant;
  /** Responsive padding escalation on larger screens */
  responsive?: CardResponsive;
  /** Whether to render as interactive element (adds hover/focus states) */
  interactive?: boolean;
  /** Custom className to merge with computed styles */
  className?: string;
  /** Card content */
  children?: React.ReactNode;
}

/**
 * CardBase: Semantic foundation for all card-like components
 *
 * Enforces consistent padding, border radius, shadows, and spacing across:
 * - Featured project cards
 * - Standard project cards
 * - Metric cards
 * - Decision cards
 * - Trade-off cards
 * - Custom content cards
 *
 * Usage:
 * <CardBase variant="featured" size="lg" responsive="spacious">
 *   <h3>Featured Project</h3>
 *   <p>Description...</p>
 * </CardBase>
 */

export function CardBase({
  size = 'md',
  variant = 'standard',
  responsive = 'default',
  interactive = false,
  className,
  children,
  ...props
}: CardBaseProps) {
  // Padding scale mapping
  const paddingMap: Record<CardSize, Record<CardResponsive, string>> = {
    sm: {
      none: 'p-5',
      compact: 'p-5',
      default: 'p-5 md:p-6',
      spacious: 'p-5 md:p-7',
    },
    md: {
      none: 'p-6',
      compact: 'p-5 md:p-6',
      default: 'p-6 md:p-8',
      spacious: 'p-7 md:p-10',
    },
    lg: {
      none: 'p-8',
      compact: 'p-6 md:p-8',
      default: 'p-8 md:p-10',
      spacious: 'p-9 md:p-12',
    },
  };

  // Border radius mapping
  const radiusMap: Record<CardSize, string> = {
    sm: 'rounded-md',
    md: 'rounded-lg',
    lg: 'rounded-lg',
  };

  // Variant styling system
  const variantMap: Record<CardVariant, string> = {
    quiet:
      'border border-border/20 shadow-elevation-1 hover:shadow-elevation-1 hover:border-border/30',
    standard:
      'border border-border/40 shadow-elevation-1 hover:shadow-elevation-2 hover:border-border/70',
    featured:
      'border border-border/40 shadow-elevation-2 hover:shadow-elevation-3 hover:border-border/70 focus-within:shadow-elevation-3 focus-within:border-border/70',
  };

  // Base card styling
  const baseClasses =
    'bg-background/50 backdrop-blur-sm transition-all duration-300 motion-safe:transition-all';

  // Interactivity classes (applied only if interactive flag is true)
  const interactiveClasses = interactive ? 'hover:cursor-pointer' : '';

  const computedClassName = cn(
    baseClasses,
    radiusMap[size],
    variantMap[variant],
    paddingMap[size][responsive],
    interactiveClasses,
    className,
  );

  return (
    <div className={computedClassName} {...props}>
      {children}
    </div>
  );
}

/**
 * Preset card variants for common use cases
 * These are convenience exports for the most common patterns
 */

export function CardQuiet(props: Omit<CardBaseProps, 'variant'>) {
  return <CardBase variant="quiet" {...props} />;
}

export function CardStandard(props: Omit<CardBaseProps, 'variant'>) {
  return <CardBase variant="standard" {...props} />;
}

export function CardFeatured(props: Omit<CardBaseProps, 'variant'>) {
  return <CardBase variant="featured" {...props} />;
}

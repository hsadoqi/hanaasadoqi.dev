import { Button } from '@/components/ui';
import { heroSocialLinks } from '@/constants';
import { cn } from '@/lib';
import Link from 'next/link';

export const SocialMediaIcons = ({ iconClass }: { iconClass?: string }) => (
  <div
    className="hero-enter flex w-full items-center gap-2"
    aria-label="Social links"
  >
    {heroSocialLinks.map((item) => {
      const Icon = item.icon;

      return (
        <Button
          key={item.href}
          aria-label={item.label}
          size="lg"
          variant="ghost"
          className="text-muted-foreground hover:bg-muted hover:text-brand size-6 transition-colors duration-300 ease-linear hover:motion-safe:-translate-y-0.5 focus-visible:motion-safe:-translate-y-0.5 sm:size-6"
          asChild
        >
          <Link href={item.href}>
            <Icon
              className={cn(
                'block size-5 transition-opacity sm:size-6',
                iconClass,
              )}
            />
            <span className="sr-only">{item.label}</span>
          </Link>
        </Button>
      );
    })}
  </div>
);

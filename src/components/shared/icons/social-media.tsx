import { Button } from '@/components/ui';
import { heroSocialLinks } from '@/constants';

export const SocialMediaIcons = () => (
  <div
    className="hero-enter hero-enter-delay-2 flex w-full gap-2"
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
          className="text-muted-foreground hover:bg-muted hover:text-brand size-10 transition-colors duration-300 ease-linear hover:motion-safe:-translate-y-0.5 focus-visible:motion-safe:-translate-y-0.5 sm:size-12"
          asChild
        >
          <a href={item.href}>
            <Icon className="size-5 sm:size-6" />
            <span className="sr-only">{item.label}</span>
          </a>
        </Button>
      );
    })}
  </div>
);

import type { ComponentProps } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

type IconProps = ComponentProps<'svg'>;

export const GitHubIcon = ({ className, ...props }: IconProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    fill="currentColor"
    className={cn('size-4 shrink-0', className)}
    {...props}
  >
    <path d="M8 .25a8 8 0 00-2.529 15.591c.4.074.546-.174.546-.386l-.01-1.36c-2.225.483-2.695-1.073-2.695-1.073-.364-.924-.888-1.17-.888-1.17-.726-.497.055-.487.055-.487.802.056 1.225.824 1.225.824.713 1.221 1.872.869 2.328.664.072-.516.279-.869.508-1.069-1.776-.202-3.644-.888-3.644-3.953 0-.874.312-1.588.823-2.147-.082-.202-.357-1.016.079-2.117 0 0 .671-.215 2.2.82A7.662 7.662 0 018 4.976c.68.003 1.364.092 2.003.27 1.527-1.035 2.197-.82 2.197-.82.437 1.101.162 1.915.08 2.117.512.559.822 1.273.822 2.147 0 3.073-1.87 3.749-3.653 3.947.288.248.544.735.544 1.482l-.009 2.198c0 .214.144.463.55.385A8.001 8.001 0 008 .25z" />
  </svg>
);

export const LinkedInIcon = ({ className, ...props }: IconProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    fill="currentColor"
    className={cn('size-4 shrink-0', className)}
    {...props}
  >
    <path d="M0 1.146C0 .514.516 0 1.146 0h13.708C15.484 0 16 .514 16 1.146v13.708c0 .632-.516 1.146-1.146 1.146H1.146C.516 16 0 15.484 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
  </svg>
);

export const MailIcon = ({ className, ...props }: IconProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    fill="currentColor"
    className={cn('size-4 shrink-0', className)}
    {...props}
  >
    <path d="M0 4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v.217l7 4.2 7-4.2V4a1 1 0 00-1-1H2zm13 2.383l-4.708 2.825L15 11.105V5.383zM14.8 12l-5.64-3.385L8 9.583l-1.16-.697L1.2 12H14.8zM1 11.105l4.708-2.897L1 5.383v5.722z" />
  </svg>
);

export const socialMediaIcons = [
  {
    label: 'GitHub',
    href: 'https://github.com/hanaasadoqi',
    icon: GitHubIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hanaasadoqi',
    icon: LinkedInIcon,
  },
  {
    label: 'Email Me',
    href: 'mailto:hello@hanaasadoqi.dev',
    icon: MailIcon,
  },
];

export const SocialMediaIcons = () => (
  <div
    className="hero-enter hero-enter-delay-2 flex w-full gap-2"
    aria-label="Social links"
  >
    {socialMediaIcons.map((item) => {
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
          <Link href={item.href}>
            <Icon className="size-5 sm:size-6" />
            <span className="sr-only">{item.label}</span>
          </Link>
        </Button>
      );
    })}
  </div>
);

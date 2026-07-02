import type { ComponentProps, ComponentType } from 'react';

import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from '@/features/icons/social-icons';

export type SiteNavLink = {
  href: string;
  label: string;
};

export type SocialLink = {
  id: 'github' | 'x' | 'linkedin' | 'email';
  label: string;
  href: string;
  icon: ComponentType<ComponentProps<'span'>>;
  showInHero?: boolean;
  showInFooter?: boolean;
  showInContact?: boolean;
  isPrimaryContact?: boolean;
};

export const primaryEmailAddress = 'hello@hsadoqi@gmail.com';

export const siteNavigationLinks: SiteNavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/writing', label: 'Writing' },
];

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/hanaasadoqi',
    icon: GitHubIcon,
    showInHero: true,
    showInFooter: true,
    showInContact: true
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hanaasadoqi',
    icon: LinkedInIcon,
    showInHero: true,
    showInFooter: true,
    showInContact: true,
  },
  {
    id: 'email',
    label: 'Email',
    href: `mailto:${primaryEmailAddress}`,
    icon: MailIcon,
    showInHero: true,
    showInContact: true,
    isPrimaryContact: true,
  },
];

export const heroSocialLinks = socialLinks.filter((link) => link.showInHero);
export const footerSocialLinks = socialLinks.filter(
  (link) => link.showInFooter,
);
export const contactSocialLinks = socialLinks.filter(
  (link) => link.showInContact && !link.isPrimaryContact,
);
export const primaryContactLink =
  socialLinks.find((link) => link.isPrimaryContact) ?? socialLinks[0];

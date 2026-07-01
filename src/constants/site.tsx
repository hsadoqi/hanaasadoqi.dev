import type { ComponentProps, ComponentType } from 'react';

import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  XIcon,
} from '@/components/shared/icons/social-icons';

export type SiteNavLink = {
  href: string;
  label: string;
};

export type SocialLink = {
  id: 'github' | 'x' | 'linkedin' | 'email';
  label: string;
  href: string;
  icon: ComponentType<ComponentProps<'svg'>>;
  showInHero?: boolean;
  showInFooter?: boolean;
  showInContact?: boolean;
  isPrimaryContact?: boolean;
};

export const siteNavigationLinks: SiteNavLink[] = [
  { href: '/#projects', label: 'Projects' },
  { href: '/#writing', label: 'Writing' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/hanaasadoqi',
    icon: GitHubIcon,
    showInHero: true,
    showInFooter: true,
    showInContact: true,
  },
  {
    id: 'x',
    label: 'X',
    href: 'https://x.com/hanaasadoqi',
    icon: XIcon,
    showInFooter: true,
    showInContact: true,
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
    href: 'mailto:hello@hanaasadoqi.dev',
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
  (link) => link.showInContact,
);
export const primaryContactLink =
  socialLinks.find((link) => link.isPrimaryContact) ?? socialLinks[0];
export const primaryEmailAddress = 'hello@hanaasadoqi.dev';

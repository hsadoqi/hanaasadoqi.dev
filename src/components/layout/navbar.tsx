import { Container } from '@/components/shared/container';
import { LinkButton } from '@/components/shared/buttons/link-button';
import { Logo } from '@/components/shared/icons/logo';
import { ThemeToggle } from '@/components/shared/theme/theme-toggle';
import Image from 'next/image';

const customNavLinks = [
  { href: '/#projects', label: 'Projects' },
  { href: '/#writing', label: 'Writing' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

export type NavLink = {
  href: string;
  label: string;
};

export function Navbar({
  navLinks = customNavLinks,
}: {
  navLinks?: NavLink[];
}) {
  return (
    <header className="border-border/50 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <span className="block md:sr-only md:hidden">
          <Image
            src="/icons/icon.png"
            alt="Hanaa Sadoqi"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
        </span>
        <span className="hidden md:block">
          <Logo />
        </span>
        <nav className="ml-4 hidden gap-1 sm:flex">
          {navLinks.map((link) => (
            <LinkButton
              key={link.href}
              href={link.href}
              variant="ghost"
              className="type-body-sm text-muted-foreground hover:bg-muted hover:text-foreground h-full px-3 py-2 font-medium motion-safe:transition-colors"
            >
              {link.label}
            </LinkButton>
          ))}
        </nav>
        <ThemeToggle />
      </Container>
    </header>
  );
}

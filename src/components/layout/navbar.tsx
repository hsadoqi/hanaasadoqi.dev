import { Container } from '@/components/shared/container';
import { LinkButton } from '@/components/shared/buttons/link-button';
import { Logo } from '@/components/shared/logo';
import { ThemeToggle } from '@/components/shared/theme/theme-toggle';

const customNavLinks = [
  { href: '/#projects', label: 'Projects' },
  { href: '/#writing', label: 'Writing' },
  { href: '/#about', label: 'About' },
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
        <Logo />
        <nav className="ml-4 hidden gap-1 sm:flex">
          {navLinks.map((link) => (
            <LinkButton
              key={link.href}
              href={link.href}
              variant="ghost"
              className="text-muted-foreground hover:bg-brand-foreground hover:text-brand h-full px-3 py-2 text-sm font-medium"
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

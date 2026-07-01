import { Container } from '@/components/layout/container';
import { footerSocialLinks } from '@/constants';

export function Footer() {
  return (
    <footer className="border-border/50 bg-muted/40 border-t py-8 sm:py-12">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Hanaa Sadoqi. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            {footerSocialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

import { Section } from '@/components/layout/section';

const contactActions = [
  { label: 'GitHub', href: 'https://github.com/hanaasadoqi', icon: 'GH' },
  { label: 'X', href: 'https://x.com/hanaasadoqi', icon: 'X' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hanaasadoqi',
    icon: 'IN',
  },
  {
    label: 'Email',
    href: 'mailto:hello@hanaasadoqi.dev',
    icon: '@',
    isPrimary: true,
  },
];

export function ContactSection() {
  return (
    <Section
      id="contact"
      header={{
        eyebrow: 'Contact',
        title: "Let's build something.",
        description: "('cause, like, why not?)",
      }}
    >
      <div className="max-w-3xl space-y-14">
        {/* Main narrative */}
        <div className="space-y-8">
          <p className="type-body">
            If you&apos;ve made it this far, we probably care about similar
            things.
          </p>

          {/* Values */}
          <div className="space-y-4">
            <p className="type-eyebrow">What matters to me</p>
            <ul className="space-y-3">
              {[
                'Thoughtful software that respects user time and attention',
                'Clear systems with transparent trade-offs',
                'Good products that solve real problems',
                'Problems worth getting slightly obsessed with',
              ].map((value, i) => (
                <li
                  key={i}
                  className="type-body-sm hover:text-foreground flex gap-3 motion-safe:transition-colors motion-safe:duration-200"
                >
                  <span className="text-brand/60 hover:text-brand mt-1 flex-shrink-0 motion-safe:transition-colors">
                    ✓
                  </span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div className="border-border/30 space-y-3 border-t pt-2">
            <p className="type-body">
              Whether it&apos;s rebuilding legacy software, validating a new
              idea, architecting a complex system, or figuring out why something
              feels more complicated than it should—I&apos;d love to hear about
              it.
            </p>

            <p className="type-body-sm">
              You can usually find me here. Responses are generally much faster
              than my sleeping schedule would suggest.
            </p>
          </div>
        </div>

        {/* Contact actions - enhanced with cards */}
        <div className="border-border/30 space-y-5 border-t pt-4">
          <p className="type-eyebrow">Let&apos;s connect</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {contactActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                target={action.href.startsWith('http') ? '_blank' : undefined}
                rel={action.href.startsWith('http') ? 'noreferrer' : undefined}
                className={`group flex flex-col items-center gap-2 rounded-lg border p-4 motion-safe:transition-all motion-safe:duration-200 ${
                  action.isPrimary
                    ? 'border-brand/20 bg-brand/5 hover:border-brand/50 hover:bg-brand/10 hover:shadow-elevation-2'
                    : 'border-border/40 bg-background/40 hover:border-border/60 hover:bg-background/60 hover:shadow-elevation-2'
                }`}
              >
                <span className="font-mono text-sm font-semibold tracking-wider">
                  {action.icon}
                </span>
                <span
                  className={`text-xs font-semibold motion-safe:transition-colors motion-safe:duration-200 ${
                    action.isPrimary
                      ? 'text-brand/70 group-hover:text-brand'
                      : 'text-muted-foreground group-hover:text-foreground'
                  }`}
                >
                  {action.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

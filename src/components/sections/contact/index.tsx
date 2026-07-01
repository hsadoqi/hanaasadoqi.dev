import { Section } from '@/components/layout/section';
import {
  contactSocialLinks,
  primaryContactLink,
  primaryEmailAddress,
} from '@/constants';

export function ContactSection() {
  const PrimaryIcon = primaryContactLink.icon;

  return (
    <Section
      id="contact"
      className="pt-10 pb-16 sm:pt-12 sm:pb-20 md:pt-20 md:pb-28 lg:pb-32"
      header={{
        eyebrow: 'Contact',
        title: "Let's connect.",
        description:
          'Open to thoughtful products, complex systems, and good problems.',
        className: 'mb-8 sm:mb-10 lg:mb-12',
      }}
    >
      <div className="max-w-3xl space-y-12 sm:space-y-14">
        <a
          href={primaryContactLink.href}
          className="group border-brand/20 bg-brand/5 hover:border-brand/45 hover:bg-brand/8 focus-visible:ring-ring focus-visible:ring-offset-background flex rounded-2xl border p-5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:transition-all motion-safe:duration-200"
        >
          <span className="bg-brand/10 text-brand mr-4 flex size-11 items-center justify-center rounded-xl">
            <PrimaryIcon className="size-5" />
          </span>
          <span className="min-w-0 space-y-1">
            <span className="type-eyebrow text-brand/80 block">
              Primary contact
            </span>
            <span className="text-foreground block text-base font-semibold">
              Email me directly
            </span>
            <span className="text-muted-foreground group-hover:text-foreground block text-sm motion-safe:transition-colors motion-safe:duration-200">
              {primaryEmailAddress}
            </span>
          </span>
        </a>

        <div className="space-y-8">
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

          <div className="border-border/30 space-y-3 border-t pt-2">
            <p className="type-body">
              Whether it&apos;s rebuilding legacy software, validating a new
              idea, architecting a complex system, or figuring out why something
              feels more complicated than it should—I&apos;d love to hear about
              it.
            </p>

            <p className="type-body-sm">
              Email is usually the fastest way to reach me.
            </p>
          </div>
        </div>

        <div className="border-border/30 space-y-5 border-t pt-4">
          <p className="type-eyebrow">Elsewhere</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {contactSocialLinks.map((action) => {
              const Icon = action.icon;

              return (
                <a
                  key={action.id}
                  href={action.href}
                  target={action.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    action.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className={`group focus-visible:ring-ring focus-visible:ring-offset-background flex flex-col items-center gap-3 rounded-lg border p-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:transition-all motion-safe:duration-200 ${
                    action.isPrimaryContact
                      ? 'border-brand/20 bg-brand/5 hover:border-brand/50 hover:bg-brand/10 hover:shadow-elevation-2'
                      : 'border-border/40 bg-background/40 hover:border-border/60 hover:bg-background/60 hover:shadow-elevation-2'
                  }`}
                >
                  <span
                    className={`flex size-10 items-center justify-center rounded-full ${
                      action.isPrimaryContact
                        ? 'bg-brand/10 text-brand'
                        : 'bg-muted text-muted-foreground group-hover:text-foreground'
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span
                    className={`text-sm font-semibold motion-safe:transition-colors motion-safe:duration-200 ${
                      action.isPrimaryContact
                        ? 'text-brand/70 group-hover:text-brand'
                        : 'text-muted-foreground group-hover:text-foreground'
                    }`}
                  >
                    {action.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

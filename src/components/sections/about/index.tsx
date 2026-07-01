import { Section } from '@/components/layout';
import Image from 'next/image';
import Link from 'next/link';

const profileHighlights = [
  {
    label: 'Engineering lens',
    value: 'Product-minded systems architecture',
  },
  {
    label: 'Shown through',
    value: 'Payroll, permissions, and knowledge workflows',
  },
  {
    label: 'Started in',
    value: 'Mechanical engineering',
  },
];

export function AboutSection() {
  return (
    <Section
      id="about"
      className="relative overflow-hidden pt-10 pb-14 sm:pt-12 sm:pb-16 md:pt-20 md:pb-24"
      header={{
        eyebrow: 'About',
        title: 'How I Think',
        className: 'mb-8 sm:mb-10 lg:mb-12',
      }}
    >
      <div className="grid items-start gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-14">
        <div className="space-y-8 lg:col-span-2">
          <div className="border-border/30 bg-background/45 shadow-elevation-1 relative overflow-hidden rounded-[1.75rem] border p-6 backdrop-blur-sm sm:p-8">
            <div
              aria-hidden="true"
              className="from-brand/12 via-brand/4 absolute inset-x-0 top-0 h-px bg-gradient-to-r to-transparent"
            />
            <div className="type-body space-y-6">
              <p className="text-foreground font-medium">
                I didn&apos;t expect to end up in software.
              </p>
              <p>
                For years I thought I&apos;d become a fantasy author. Looking
                back, I think what I really loved wasn&apos;t writing stories—it
                was{' '}
                <span className="text-brand font-medium">building worlds</span>.
                Systems with rules, trade-offs, and internal logic that create
                meaning.
              </p>
              <p>
                Mechanical engineering turned out to scratch the same itch, and
                software even more so. Both let me design systems that do
                something real.
              </p>
              <p>
                Today I&apos;m happiest somewhere between product, architecture,
                and engineering, understanding messy problems deeply before
                writing code, and building systems that quietly get out of
                people&apos;s way.
              </p>
              <p>
                That shows up in projects like{' '}
                <Link
                  href="/projects/generafi"
                  className="text-foreground decoration-border hover:text-brand hover:decoration-brand/50 underline underline-offset-4 motion-safe:transition-colors"
                >
                  Generafi
                </Link>
                , where the problem is not just shipping screens, but making
                payroll, permissions, and operational workflows easier to trust.
              </p>
              <div className="border-border/30 border-t pt-2">
                <p>I still think like a world builder.</p>
                <p className="type-body-sm mt-3 italic">
                  The worlds just happen to compile now.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 lg:sticky lg:top-24 lg:col-span-1">
          <div className="group border-border/40 bg-background/50 shadow-elevation-2 hover:shadow-elevation-3 overflow-hidden rounded-[1.75rem] border p-3 backdrop-blur-sm motion-safe:transition-all motion-safe:duration-300 hover:motion-safe:-translate-y-1">
            <div className="overflow-hidden rounded-[1.1rem]">
              <Image
                src="/images/bowie.png"
                alt="Portrait of Hanaa Sadoqi"
                width={300}
                height={300}
                sizes="(max-width: 768px) 90vw, (min-width: 1024px) 300px"
                className="aspect-square w-full max-w-sm object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:motion-safe:scale-[1.02]"
              />
            </div>
            <div className="flex items-center justify-between gap-4 px-1 pt-4">
              <div>
                <p className="type-eyebrow">Currently</p>
                <p className="text-foreground mt-2 text-sm font-medium">
                  Building software for messy, real-world constraints.
                </p>
              </div>
              <span
                aria-hidden="true"
                className="bg-brand/70 shadow-elevation-1 h-2.5 w-2.5 flex-shrink-0 rounded-full"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {profileHighlights.map((item) => (
              <div
                key={item.label}
                className="border-border/30 bg-background/40 hover:border-border/60 hover:bg-background/65 rounded-2xl border p-4 backdrop-blur-sm motion-safe:transition-all motion-safe:duration-200"
              >
                <p className="type-eyebrow">{item.label}</p>
                <p className="text-foreground mt-2 text-sm leading-6 font-medium text-balance">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

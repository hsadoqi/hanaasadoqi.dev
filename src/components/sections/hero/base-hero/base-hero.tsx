import { Section } from '@/components/layout/section';
import { HeroLayout } from '../hero-layout';

export const BaseHero = ({
  greeting,
  headlineParts,
  identities,
  cta,
}: {
  greeting: string;
  headlineParts: string[];
  identities: string[];
  cta: string;
}) => {
  return (
    <Section
      id="hero"
      className="before:from-background via-background before:to-background/80 relative border-b before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b"
      aria-labelledby="hero-heading"
      fullScreen
      justify="evenly"
      marginLineText="Brooklyn, NY"
      containerClassName="relative grid gap-16 md:grid-cols-[1fr_auto] md:gap-24 items-end max-w-full mx-0 z-10"
    >
      <HeroLayout
        greeting={greeting}
        headlineParts={headlineParts}
        identities={identities}
        cta={cta}
      />
    </Section>
  );
};

export default BaseHero;

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
      className="border-b"
      aria-labelledby="hero-heading"
      fullScreen
      justify="evenly"
      marginLineText="Brooklyn, NY"
      containerClassName="grid gap-16 md:grid-cols-[1fr_auto] md:gap-24 items-end max-w-full mx-0"
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

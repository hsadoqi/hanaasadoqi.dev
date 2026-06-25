import { Section } from '@/components/layout/section';
import HeroContent from './hero-content';
import HeroCta from './hero-cta';

export const Hero = ({
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
      align="center"
      justify="center"
      // showMarginLine
      marginLineText="Brooklyn, NY"
      containerClassName="grid gap-16 md:grid-cols-[1fr_auto] md:gap-24 items-end"
    >
      <div className="space-y-10">
        <p className="text-muted-foreground hover:text-foreground text-sm font-medium tracking-[0.25em] uppercase transition-colors">
          {greeting}
        </p>
        <HeroContent headlineParts={headlineParts} identities={identities} />
      </div>
      <div className="flex items-center justify-center md:justify-start">
        <HeroCta cta={cta} />
      </div>
    </Section>
  );
};

export default Hero;

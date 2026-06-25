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
      containerClassName="grid md:grid-cols-[1fr_auto] gap-16 md:gap-24 items-end"
      eyebrow={greeting}
    >
      <HeroContent headlineParts={headlineParts} identities={identities} />
      <div className="flex items-center justify-center md:justify-start">
        <HeroCta cta={cta} />
      </div>
    </Section>
  );
};

export default Hero;

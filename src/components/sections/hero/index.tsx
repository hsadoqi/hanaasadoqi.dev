import { HeroLayout } from './hero-layout';

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
    <HeroLayout
      greeting={greeting}
      headlineParts={headlineParts}
      identities={identities}
      cta={cta}
      className={'justify-evenly'}
    />
  );
};

export default Hero;

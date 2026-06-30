import { HeroLayout } from './hero-layout';

export const Hero = ({
  greeting,
  headlineParts,
  supportingLine,
  identities,
  cta,
}: {
  greeting: string;
  headlineParts: string[];
  supportingLine?: string;
  identities: string[];
  cta: string;
}) => {
  return (
    <HeroLayout
      greeting={greeting}
      headlineParts={headlineParts}
      supportingLine={supportingLine}
      identities={identities}
      cta={cta}
      className={'justify-evenly'}
    />
  );
};

export default Hero;

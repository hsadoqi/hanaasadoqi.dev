import { HeroLayout } from './hero-layout';
import type { HeroHeadlinePart } from './hero-layout';

export const Hero = ({
  greeting,
  headlineParts,
  supportingLine,
  cta,
}: {
  greeting: string;
  headlineParts: HeroHeadlinePart[];
  supportingLine?: string;
  cta: string;
}) => {
  return (
    <HeroLayout
      greeting={greeting}
      headlineParts={headlineParts}
      supportingLine={supportingLine}
      cta={cta}
      className={'justify-evenly'}
    />
  );
};

export default Hero;

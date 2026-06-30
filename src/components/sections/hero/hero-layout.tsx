import { cn } from '@/lib/utils';
import Link from 'next/link';

export const HeroLayout = ({
  greeting,
  headlineParts,
  supportingLine,
  identities,
  cta,
  className,
}: {
  greeting: string;
  headlineParts: string[];
  supportingLine?: string;
  identities: string[];
  cta: string;
  className?: string;
}) => {
  return (
    <div
      id="hero"
      className={cn(
        'relative flex min-h-screen flex-col justify-between overflow-hidden px-6 py-16 md:px-12 md:py-24',
        className,
      )}
    >
      <div className="bg-foreground/3 pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full blur-3xl" />
      <div className="bg-foreground/3 pointer-events-none absolute -right-40 -bottom-40 h-80 w-80 rounded-full blur-3xl" />

      <HeroContent
        greeting={greeting}
        headlineParts={headlineParts}
        supportingLine={supportingLine}
      />

      <div className="relative z-10 flex flex-col items-end justify-between gap-8 md:flex-row md:gap-12">
        <div className="space-y-3 md:ml-auto md:text-right">
          {identities.map((line, i) => (
            <p
              key={i}
              className="type-body md:text-body-lg"
            >
              {line}
            </p>
          ))}
        </div>

        <HeroCta cta={cta} />
      </div>
    </div>
  );
};

const HeroContent = ({
  greeting,
  headlineParts,
  supportingLine,
}: {
  greeting: string;
  headlineParts: string[];
  supportingLine?: string;
}) => {
  return (
    <div id="hero-content" className="relative z-10">
      <p className="type-eyebrow mb-12">{greeting}</p>
      <h1 className="type-hero max-w-6xl">
        {headlineParts.map((line, i) => {
          const isBrandHighlight =
            line.toLowerCase().includes('side') ||
            line.toLowerCase().includes('quest');

          return (
            <span
              key={i}
              className={cn('block', {
                'from-foreground to-brand bg-gradient-to-r bg-clip-text text-transparent':
                  isBrandHighlight,
              })}
              id="hero-content"
            >
              {line}
            </span>
          );
        })}
      </h1>

      {supportingLine ? (
        <p className="type-body-lg mt-10 max-w-2xl">{supportingLine}</p>
      ) : null}
    </div>
  );
};

// const HeroContent = ({
//   greeting,
//   headlineParts,
//   supportingLine,
// }: {
//   greeting: string;
//   headlineParts: string[];
//   supportingLine?: string;
// }) => {
//   return (
//     <div className="relative z-10">
//       {/* Greeting */}
//       <p className="type-eyebrow mb-16">{greeting}</p>

//       {/* Headline with brand color gradient on "side quests" */}
//       <h1 className="type-hero max-w-6xl">
//         {headlineParts.map((line, i) => {
//           const isBrandHighlight =
//             line.toLowerCase().includes('side') ||
//             line.toLowerCase().includes('quest');
//           return (
//             <span
//               key={i}
//               className={`block ${
//                 isBrandHighlight
//                   ? 'from-foreground to-brand bg-gradient-to-r bg-clip-text text-transparent'
//                   : ''
//               }`}
//             >
//               {line}
//             </span>
//           );
//         })}
//       </h1>
//       {supportingLine ? (
//         <p className="type-body-lg mt-10 max-w-2xl">{supportingLine}</p>
//       ) : null}
//     </div>
//   );
// };

export const HeroCta = ({ cta }: { cta: string }) => {
  return (
    <Link
      href="#projects"
      className="group type-eyebrow text-foreground hover:text-brand inline-flex flex-col items-center gap-2 motion-safe:transition-colors motion-safe:duration-200 md:text-sm"
    >
      <span>{cta}</span>
      <span className="group-hover:translate-y-1 motion-safe:transition-transform motion-safe:duration-200">
        ↓
      </span>
    </Link>
  );
};

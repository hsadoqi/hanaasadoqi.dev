// import { Section } from '@/components/layout';
// import Image from 'next/image';

// const observations = [
//   'Rebuilding a payroll platform from scratch.',
//   'Building Synapcity one rabbit hole at a time.',
//   'Mechanical engineer → software engineer.',
//   'Usually somewhere between engineering, architecture, and product thinking.',
//   'Professional overthinker.',
//   'Powered by coffee and impossible side quests.',
// ];

// export function AboutSection() {
//   return (
//     <Section
//       id="about"
//       header={{
//         eyebrow: 'About',
//         title: 'About Me',
//       }}
//     >
//       {/* Photo placeholder + observations */}
//       <div className="space-x-8">
//         <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
//           {/* Copy */}
//           <div className="text-muted-foreground/80 space-y-6 text-sm leading-relaxed sm:text-[15px]">
//             <p>I didn&apos;t expect to end up in software.</p>
//             <p>
//               For years I thought I&apos;d become a fantasy author. Looking
//               back, I think what I really loved wasn&apos;t writing stories—it
//               was building worlds. Systems with rules, trade-offs, and internal
//               logic.
//             </p>
//             <p>
//               Mechanical engineering turned out to scratch the same itch, and
//               software even more so.
//             </p>
//             <p>
//               Today I&apos;m happiest somewhere between product, architecture,
//               and engineering—understanding messy problems before writing code
//               and building systems that quietly get out of people&apos;s way.
//             </p>
//             <p>I still think like a world builder.</p>
//             <p>The worlds just happen to compile now.</p>
//           </div>
//           {/* Photo placeholder */}
//           <div className="space-y-8">
//             <div className="bg-muted/40 border-border/30 aspect-square w-full rounded-lg border">
//               <div className="text-center">
//                 <p className="text-muted-foreground/40 font-mono text-xs">
//                   <Image
//                     src="/images/bowie.png"
//                     alt="Portrait of Hanaa Sadoqi"
//                     width={24}
//                     height={24}
//                     sizes="(min-width: 1024px) 288px, 240px"
//                     priority
//                     className="h-full w-full object-cover"
//                   />
//                 </p>

//                 <p className="text-muted-foreground/30 mt-1 text-[11px]">
//                   (You + your dog)
//                 </p>
//               </div>
//             </div>
//           </div>
//           {/* Observations */}
//           <div className="space-y-3">
//             {observations.map((obs, i) => (
//               <div
//                 key={i}
//                 className="text-muted-foreground/70 flex gap-3 text-sm"
//               >
//                 <span className="bg-muted-foreground/30 mt-1 h-1 w-1 flex-shrink-0 rounded-full" />
//                 <span>{obs}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Section>
//   );
// }

import { Section } from '@/components/layout';
import Image from 'next/image';

const observations = [
  'Rebuilding a payroll platform from scratch.',
  'Building Synapcity one rabbit hole at a time.',
  'Mechanical engineer → software engineer.',
  'Usually somewhere between engineering, architecture, and product thinking.',
  'Professional overthinker.',
  'Powered by coffee and impossible side quests.',
];

export function AboutSection() {
  return (
    <Section
      id="about"
      header={{
        eyebrow: 'About',
        title: 'Who, me?!',
      }}
    >
      <div className="grid items-start gap-12 lg:grid-cols-3 lg:gap-14">
        {/* Main narrative — 2 cols wide */}
        <div className="space-y-8 lg:col-span-2">
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
              and engineering—understanding messy problems deeply before writing
              code, and building systems that quietly get out of people&apos;s
              way.
            </p>
            <div className="border-border/30 border-t pt-2">
              <p>I still think like a world builder.</p>
              <p className="type-body-sm mt-3 italic">
                The worlds just happen to compile now.
              </p>
            </div>
          </div>
        </div>

        {/* Photo + Observations — 1 col */}
        <div className="sticky top-24 space-y-8 lg:col-span-1">
          {/* Photo */}
          <div className="border-border/40 shadow-elevation-2 overflow-hidden rounded-2xl border">
            <Image
              src="/images/bowie.png"
              alt="Portrait of Hanaa Sadoqi"
              width={300}
              height={300}
              sizes="(max-width: 768px) 90vw, (min-width: 1024px) 300px"
              priority
              className="aspect-square w-full max-w-sm object-cover"
            />
          </div>

          {/* Observations */}
          <div className="space-y-4">
            <p className="type-eyebrow">Quick takes</p>
            <ul className="space-y-2.5">
              {observations.map((obs, i) => (
                <li
                  key={i}
                  className="type-caption hover:text-foreground flex gap-3 motion-safe:transition-colors motion-safe:duration-200"
                >
                  <span className="text-brand/60 hover:text-brand mt-1.5 flex-shrink-0 font-medium motion-safe:transition-colors">
                    ·
                  </span>
                  <span>{obs}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

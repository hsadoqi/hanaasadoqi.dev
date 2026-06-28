// 'use client';

// import { useState } from 'react';
// import { Section } from '@/components/layout/section';
// import { Pill } from '@/components/shared/badges';
// import { writingArticles } from '../data';

// const MOBILE_INITIAL = 3;

// const statusColor: Record<'Published' | 'Draft' | 'Planned', string> = {
//   Published: 'bg-green-500/10 text-green-600 dark:text-green-400',
//   Draft: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
//   Planned: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
// };

// export function WritingSection() {
//   const [showAll, setShowAll] = useState(false);
//   const visibleArticles = showAll
//     ? writingArticles
//     : writingArticles.slice(0, MOBILE_INITIAL);
//   const remaining = writingArticles.length - MOBILE_INITIAL;

//   return (
//     <Section
//       id="writing"
//       header={{
//         eyebrow: 'Writing',
//         title: "Tech Musings",
//       }}
//     >
//       <div className="space-y-0">
//         {visibleArticles.map((article, index) => (
//           <article
//             key={article.id}
//             className={`border-border/30 space-y-3 py-7 motion-safe:transition-all motion-safe:duration-200 sm:py-8 ${
//               index !== visibleArticles.length - 1 ? 'border-b' : ''
//             }`}
//           >
//             {/* Status badge + Title */}
//             <div className="flex items-start gap-3 sm:gap-4">
//               <span
//                 className={`flex-shrink-0 rounded px-2 py-1 text-[11px] font-semibold ${statusColor[article.status]}`}
//               >
//                 {article.status}
//               </span>
//               <h3 className="text-foreground hover:text-foreground/80 flex-1 text-base leading-snug font-semibold motion-safe:transition-colors motion-safe:duration-200 sm:text-lg">
//                 {article.title}
//               </h3>
//             </div>

//             {/* Summary */}
//             <p className="text-muted-foreground/70 max-w-2xl text-sm leading-relaxed">
//               {article.summary}
//             </p>

//             {/* Tags */}
//             <div className="flex flex-wrap gap-1.5 pt-1">
//               {article.tags.map((tag) => (
//                 <Pill key={tag} variant="focus">
//                   {tag}
//                 </Pill>
//               ))}
//             </div>
//           </article>
//         ))}
//       </div>

//       {/* Mobile: "Show more" button */}
//       {!showAll && remaining > 0 && (
//         <button
//           onClick={() => setShowAll(true)}
//           className="border-border/40 text-muted-foreground/70 hover:text-muted-foreground hover:border-border/60 hover:bg-muted/20 focus-visible:ring-ring focus-visible:ring-offset-background mt-6 w-full rounded-lg border px-4 py-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:transition-all motion-safe:duration-200"
//         >
//           Show {remaining} more
//         </button>
//       )}

//       {showAll && writingArticles.length > MOBILE_INITIAL && (
//         <button
//           onClick={() => setShowAll(false)}
//           className="border-border/40 text-muted-foreground/70 hover:text-muted-foreground hover:border-border/60 hover:bg-muted/20 focus-visible:ring-ring focus-visible:ring-offset-background mt-6 w-full rounded-lg border px-4 py-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:transition-all motion-safe:duration-200"
//         >
//           Show less
//         </button>
//       )}
//     </Section>
//   );
// }

'use client';

import { useState } from 'react';
import { Section } from '@/components/layout/section';
import { writingArticles } from '../data';

const MOBILE_INITIAL = 3;

const statusColor: Record<'Published' | 'Draft' | 'Planned', string> = {
  Published: 'bg-green-500/10 text-green-700 dark:text-green-300 font-medium',
  Draft: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 font-medium',
  Planned: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 font-medium',
};

export function WritingSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleArticles = showAll
    ? writingArticles
    : writingArticles.slice(0, MOBILE_INITIAL);
  const remaining = writingArticles.length - MOBILE_INITIAL;

  return (
    <Section
      id="writing"
      header={{
        eyebrow: 'Writing',
        title: 'Tech Musings',
      }}
    >
      <div className="space-y-0">
        {visibleArticles.map((article, index) => (
          <article
            key={article.id}
            className={`border-border/20 hover:border-border/40 hover:bg-background/40 space-y-4 rounded-md px-4 py-7 motion-safe:transition-all motion-safe:duration-200 sm:px-6 sm:py-8 ${
              index !== visibleArticles.length - 1 ? 'border-b' : ''
            }`}
          >
            {/* Status badge + Title row */}
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-primary-content hover:text-foreground flex-1 text-base leading-snug font-semibold motion-safe:transition-colors motion-safe:duration-200 sm:text-lg">
                {article.title}
              </h3>
              <span
                className={`flex-shrink-0 rounded-md px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap ${statusColor[article.status]}`}
              >
                {article.status}
              </span>
            </div>

            {/* Summary */}
            <p className="text-secondary-content max-w-3xl text-sm leading-relaxed">
              {article.summary}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {article.tags.map((tag, tagIdx) => (
                <span
                  key={tag}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium motion-safe:transition-all motion-safe:duration-200 ${
                    tagIdx === 0
                      ? 'text-brand bg-brand/10 border-brand/30 hover:border-brand/60 hover:bg-brand/15 border'
                      : 'text-subtle-content bg-background/60 border-border/30 hover:border-border/60 hover:bg-background border'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Show more/less button */}
      {!showAll && remaining > 0 && (
        <button
          onClick={() => setShowAll(true)}
          className="border-border/30 text-tertiary-content hover:text-secondary-content hover:border-border/50 hover:bg-background/60 focus-visible:ring-ring focus-visible:ring-offset-background mt-8 w-full rounded-md border px-4 py-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:transition-all motion-safe:duration-200"
        >
          Show {remaining} more essays
        </button>
      )}

      {showAll && writingArticles.length > MOBILE_INITIAL && (
        <button
          onClick={() => setShowAll(false)}
          className="border-border/30 text-tertiary-content hover:text-secondary-content hover:border-border/50 hover:bg-background/60 focus-visible:ring-ring focus-visible:ring-offset-background mt-8 w-full rounded-md border px-4 py-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:transition-all motion-safe:duration-200"
        >
          Show less
        </button>
      )}
    </Section>
  );
}

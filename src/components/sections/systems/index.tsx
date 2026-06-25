import { Section } from '@/components/layout/section';
import { systemCards } from '@/data/systems-data';

export const SystemsSection = () => {
  return (
    <Section
      id="systems"
      className="border-border border-t py-32"
      header={{
        eyebrow: 'systems',
        title: 'How I think about systems',
        description:
          'Things I keep coming back to — not rules, just patterns that tend to matter.',
        className: 'mb-20',
      }}
    >
      <div className="border-border grid grid-cols-1 border-t border-l sm:grid-cols-2 lg:grid-cols-4">
        {systemCards.map((card) => (
          <article
            key={card.title}
            className="border-border border-r border-b p-8"
          >
            <h3 className="text-foreground mb-2 text-sm font-semibold">
              {card.title}
            </h3>
            <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
              {card.description}
            </p>
            <p className="text-muted-foreground/75 text-xs leading-relaxed">
              {card.businessContext}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
};

export default SystemsSection;

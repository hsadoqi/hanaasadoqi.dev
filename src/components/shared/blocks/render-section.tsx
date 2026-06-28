import type { PresentationalSection as CaseStudySection } from '@/types';
import {
  SectionTitle,
  PullQuote,
  DecisionCard,
  DiagramPlaceholder,
  CalloutNote,
  ConstraintBlock,
  TradeOffCard,
  TimelineItem,
  MetricCard,
  ReflectionBlock,
} from '../blocks';

export function RenderSection({ section }: { section: CaseStudySection }) {
  switch (section.type) {
    case 'context':
      return (
        <div>
          <SectionTitle>{section.title}</SectionTitle>
          <div className="text-muted-foreground/80 space-y-4">
            {section.paragraphs.map((para, idx) => (
              <p key={idx} className="text-base leading-relaxed">
                {para}
              </p>
            ))}
            {section.pullQuote && (
              <PullQuote attribution={section.pullQuote.attribution}>
                {section.pullQuote.text}
              </PullQuote>
            )}
          </div>
        </div>
      );

    case 'decisions':
      return (
        <div>
          <SectionTitle>{section.title}</SectionTitle>
          <div className="space-y-3">
            {section.decisions.map((decision, idx) => (
              <DecisionCard
                key={idx}
                title={decision.title}
                teaser={decision.teaser}
                answer={decision.answer}
                alternatives={decision.alternatives}
              />
            ))}
          </div>
        </div>
      );

    case 'architecture':
      return (
        <div>
          <SectionTitle>{section.title}</SectionTitle>
          <DiagramPlaceholder
            label={section.diagramLabel}
            height={section.diagramHeight || 500}
            caption="High-level system architecture showing tenant isolation, rules engine, and audit layer"
          />
          <div className="mt-8 space-y-6">
            {section.callout && (
              <CalloutNote type={section.callout.type}>
                {section.callout.text}
              </CalloutNote>
            )}
            <div>
              <h3 className="text-foreground mb-3 text-lg font-semibold">
                Design Decision — {section.designDecision.title}
              </h3>
              <p className="text-muted-foreground/80 mb-3 text-sm">
                {section.designDecision.description}
              </p>
              <p className="text-muted-foreground/60 text-xs">
                Why: {section.designDecision.why}
              </p>
            </div>
          </div>
        </div>
      );

    case 'constraints':
      return (
        <div>
          <SectionTitle>{section.title}</SectionTitle>
          <div className="space-y-4">
            {section.constraints.map((constraint, idx) => (
              <ConstraintBlock
                key={idx}
                title={constraint.title}
                description={constraint.description}
                impact={constraint.impact}
              />
            ))}
          </div>
        </div>
      );

    case 'tradeoffs':
      return (
        <div>
          <SectionTitle>{section.title}</SectionTitle>
          <div className="space-y-4">
            {section.tradeoffs.map((tradeoff, idx) => (
              <TradeOffCard
                key={idx}
                title={tradeoff.title}
                whatWeChose={tradeoff.whatWeChose}
                whatItCost={tradeoff.whatItCost}
                whenWeReconsider={tradeoff.whenWeReconsider}
              />
            ))}
          </div>
        </div>
      );

    case 'timeline':
      return (
        <div>
          <SectionTitle>{section.title}</SectionTitle>
          <div className="space-y-8">
            {section.milestones.map((milestone, idx) => (
              <TimelineItem
                key={idx}
                date={milestone.date}
                title={milestone.title}
                description={milestone.description}
              />
            ))}
          </div>
        </div>
      );

    case 'metrics':
      return (
        <div>
          <SectionTitle>{section.title}</SectionTitle>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {section.metrics.map((metric, idx) => (
              <MetricCard
                key={idx}
                label={metric.label}
                value={metric.value}
                unit={metric.unit}
              />
            ))}
          </div>
        </div>
      );

    case 'reflections':
      return (
        <div>
          <SectionTitle>{section.title}</SectionTitle>
          <div className="space-y-6">
            {section.reflections.map((reflection, idx) => (
              <ReflectionBlock
                key={idx}
                title={reflection.intro}
                insight={reflection.insight}
                transferable={reflection.transferable}
              />
            ))}
          </div>
        </div>
      );

    case 'whatsnext':
      return (
        <div>
          <SectionTitle>{section.title}</SectionTitle>
          <div className="space-y-4">
            <p className="text-muted-foreground/80 text-base leading-relaxed">
              {section.intro}
            </p>
            <div className="space-y-4">
              {section.items.map((item, idx) => (
                <div key={idx} className="border-border/40 border-l pl-4">
                  <h4 className="text-foreground font-semibold">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground/70 mt-1 text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

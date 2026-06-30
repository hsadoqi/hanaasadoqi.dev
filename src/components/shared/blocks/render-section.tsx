import type { PresentationalSection as CaseStudySection } from '@/types';
import {
  CalloutNote,
  ConstraintBlock,
  DecisionCard,
  DiagramPlaceholder,
  MetricCard,
  PullQuote,
  ReflectionBlock,
  SectionTitle,
  TimelineItem,
  TradeOffCard,
} from '../blocks';

export function RenderSection({ section }: { section: CaseStudySection }) {
  switch (section.type) {
    case 'context':
      return (
        <div>
          <SectionTitle>{section.title}</SectionTitle>
          <div className="space-y-4">
            {section.paragraphs.map((para, idx) => (
              <p key={idx} className="type-body">
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
              <h3 className="type-card-title mb-3">
                Design Decision — {section.designDecision.title}
              </h3>
              <p className="type-body-sm mb-3">
                {section.designDecision.description}
              </p>
              <p className="type-caption">Why: {section.designDecision.why}</p>
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
                impactSummary={constraint.impactSummary}
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
            <p className="type-body">{section.intro}</p>
            <div className="space-y-4">
              {section.items.map((item, idx) => (
                <div key={idx} className="border-border/40 border-l pl-4">
                  <h4 className="type-card-title-sm">{item.title}</h4>
                  <p className="type-body-sm mt-1">{item.description}</p>
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

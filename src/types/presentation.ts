import { ButtonVariant } from '@/components/ui/button';
import { CalloutType } from './components';

export type ContextSection = {
  type: 'context';
  title: string;
  paragraphs: string[];
  pullQuote?: {
    text: string;
    attribution: string;
  };
};

export type Decision = {
  title: string;
  teaser: string;
  answer: string;
  alternatives?: string[];
};

export type DecisionsSection = {
  type: 'decisions';
  title: string;
  decisions: Decision[];
};

export type ArchitectureSection = {
  type: 'architecture';
  title: string;
  diagramLabel: string;
  diagramHeight?: number;
  callout?: {
    type: CalloutType;
    text: string;
  };
  designDecision: {
    title: string;
    description: string;
    why: string;
  };
};

export type Constraint = {
  title: string;
  description: string;
  impact: string[];
};

export type ConstraintsSection = {
  type: 'constraints';
  title: string;
  constraints: Constraint[];
};

export type Tradeoff = {
  title: string;
  whatWeChose: string;
  whatItCost: string;
  whenWeReconsider?: string;
};

export type TradeoffsSection = {
  type: 'tradeoffs';
  title: string;
  tradeoffs: Tradeoff[];
};

export type TimelineMilestone = {
  date: string;
  title: string;
  description: string;
};

export type TimelineSection = {
  type: 'timeline';
  title: string;
  milestones: TimelineMilestone[];
};

export type Metric = {
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
};

export type MetricsSection = {
  type: 'metrics';
  title: string;
  metrics: Metric[];
};

export type Reflection = {
  intro: string;
  insight: string;
  transferable?: string;
};

export type ReflectionsSection = {
  type: 'reflections';
  title: string;
  reflections: Reflection[];
};

export type WhatsNextItem = {
  title: string;
  description: string;
};

export type WhatsNextSection = {
  type: 'whatsnext';
  title: string;
  intro: string;
  items: WhatsNextItem[];
};

export type PresentationalSection =
  | ContextSection
  | DecisionsSection
  | ArchitectureSection
  | ConstraintsSection
  | TradeoffsSection
  | TimelineSection
  | MetricsSection
  | ReflectionsSection
  | WhatsNextSection;

export type Cta = {
  label: string;
  link?: string;
  variant?: ButtonVariant;
};

export type BaseLink = {
  href: string;
  label: string;
  isExternal: boolean;
  isDisabled: boolean;
};
export type CaseStudyLink = BaseLink & {
  kind: 'case-study' | 'external';
};

export type ProjectLink = BaseLink & {
  kind: 'project' | 'external' | 'unavailable';
};

export type AnyLink = CaseStudyLink | ProjectLink;

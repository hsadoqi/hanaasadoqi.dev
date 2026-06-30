import {
  SectionMarker,
  type SectionMarkerProps,
  type SectionMarkerTone,
  type SectionMarkerVariant,
} from '@/components/shared/blocks/section-marker';

export type MarginLineVariant = SectionMarkerVariant;
export type MarginLineTone = SectionMarkerTone;
export type MarginLineProps = SectionMarkerProps;

export const MarginLine = (props: MarginLineProps) => {
  return <SectionMarker {...props} />;
};

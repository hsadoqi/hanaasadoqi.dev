export type Experience = {
  company: string;
  title: string;
  period: string;
  location: string;
  description: string;
  signals: {
    label: string;
    value: string;
  }[];
  stack: string[];
  highlights: string[];
};

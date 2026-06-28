export type SystemCard = {
  title: string;
  description: string;
  businessContext: string;
  example: string;
  projects: string[];
  writing: string[];
  receipts: Array<{
    label: string;
    type: 'case study' | 'decision note' | 'essay' | 'implementation note';
    status: 'available' | 'draft' | 'planned';
    href?: string;
  }>;
};

export type SystemView = 'map' | 'proof' | 'index' | 'glossary';

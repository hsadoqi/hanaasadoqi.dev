export type ConceptReceipt = {
  label: string;
  type: string;
  status: 'available' | 'draft' | 'planned';
  href?: string;
};

export type ConceptItem = {
  title: string;
  description: string;
  example: string;
  projects: string[];
  writing: string[];
  receipts: ConceptReceipt[];
};

export type ConceptGroup = {
  name: string;
  description: string;
  concepts: string[];
};

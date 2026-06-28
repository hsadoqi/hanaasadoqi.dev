export interface WritingArticle {
  id: number;
  title: string;
  summary: string;
  tags: string[];
  status: 'Published' | 'Draft' | 'Planned';
  date?: string;
  readingTime?: string;
}

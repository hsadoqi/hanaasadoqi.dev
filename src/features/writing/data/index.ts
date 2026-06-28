import { WritingArticle } from '../types';

export const writingArticles: WritingArticle[] = [
  {
    id: 1,
    title: 'Why I Removed Real-Time Collaboration From Synapcity',
    summary:
      'Constraint-driven product thinking: why deliberately excluding real-time features made early validation much easier, and what that decision cost.',
    tags: ['Product Thinking', 'Architecture', 'Scoping'],
    status: 'Planned',
  },
  {
    id: 2,
    title: "Accountants Don't Think About Permissions the Way Developers Do",
    summary:
      'Building Generafi forced me to rethink how role-based access control maps to real accounting workflows — and why the standard dev mental model breaks down fast.',
    tags: ['Permissions', 'RBAC', 'Product', 'Payroll'],
    status: 'Draft',
  },
  {
    id: 3,
    title: 'What Designing Building Systems Taught Me About Software',
    summary:
      'Before code I designed HVAC and plumbing systems. The problems are different, but coordination under constraints, edge cases, and the cost of late changes look almost identical.',
    tags: ['Systems Thinking', 'Career', 'Engineering'],
    status: 'Draft',
  },
  {
    id: 4,
    title: 'Why Every Workflow Eventually Turns Into a State Machine',
    summary:
      "Once you start modeling workflows explicitly — approvals, payroll runs, onboarding sequences — the state machine pattern shows up everywhere. Here's why that's actually useful.",
    tags: ['Architecture', 'Domain Modeling', 'Workflows'],
    status: 'Planned',
  },
  {
    id: 5,
    title: 'The Problem With Generic SaaS Permissions Models',
    summary:
      'Most permissions models are designed for the tool that ships them, not the business that uses them. A look at where they break down and what a domain-aware model looks like instead.',
    tags: ['Permissions', 'SaaS', 'Architecture'],
    status: 'Planned',
  },
];

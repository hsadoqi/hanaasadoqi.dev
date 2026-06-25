import { StatusVariant, CaseStudy, FeaturedCaseStudy } from '@/types/content';

export const featured: FeaturedCaseStudy = {
  title: 'Generafi',
  subtitle: 'Rebuilding accounting and payroll for modern Moroccan businesses',
  status: 'Active rebuild — architecture in progress',
  statusVariant: 'in-progress' as StatusVariant,
  problem:
    "The existing product is a legacy DOS-era system that Moroccan SMBs still rely on for payroll and accounting. It works, but it's brittle, hard to maintain, and difficult to extend. There's no multi-tenancy, no audit trail, no real permissions model, and no path to compliance with evolving Moroccan tax and social contribution requirements (CNSS, IR, IS).",
  solution:
    "Rebuilding the system from scratch as a modern multi-tenant SaaS. The goal is not to add features — it's to get the foundations right: data isolation, versioned payroll rules, a permissions model that reflects real org structures, audit logs that are useful rather than decorative, and PDF exports that match what Moroccan accountants actually need.",
  role: 'Solo product architect and engineer. Responsible for all decisions: data modeling, RBAC design, payroll rule engine, compliance workflows, UI, and infrastructure.',
  challenges: [
    'Multi-tenant data isolation with per-tenant configuration and compliance boundaries',
    'Payroll rule versioning — rules change, but past calculations need to stay correct',
    'CNSS, IR, and IS compliance workflows that are part of the product, not bolted on',
    'Audit logs as a first-class concern, not an afterthought',
    'Designing for regulations that are still evolving',
  ],
  techStack: [
    'Rails API',
    'React + TypeScript',
    'PostgreSQL',
    'Multi-tenancy',
    'RBAC',
    'PDF generation',
  ],
  learnings: [
    'Compliance has to be in the data model, not the UI layer',
    'Audit logs earn trust — they also make debugging and disputes much easier',
    'Permissions shape how users think about data. Getting them wrong early is expensive to fix',
  ],
};

export const studies: CaseStudy[] = [
  {
    title: 'Synapcity',
    status: 'Early validation',
    statusVariant: 'concept',
    problem:
      "Teams accumulate knowledge but lose access to it. Decisions get buried in Slack, context lives in people's heads, and new contributors spend weeks reconstructing what already exists.",
    role: 'Product and engineering lead. Focused on scoping the core knowledge model, validating the problem before building, and thinking through permissions, search, and collaboration architecture.',
    focus: [
      'Knowledge structure',
      'Permissions',
      'Search & discovery',
      'Team workflows',
    ],
    proof:
      'Not launched. Currently focused on product thinking, architecture decisions, and problem validation.',
    ctaLabel: 'View notes',
    ctaHref: '#',
  },
  {
    title: 'Blog — Custom MDX site',
    status: 'Live',
    statusVariant: 'shipped',
    problem:
      'The original portfolio had a blog section tightly coupled to the site. I wanted a dedicated writing space with full control over how content is presented.',
    role: 'Full-stack. Designed the content model, built custom MDX components, and shipped the blog as its own deployable at blog.hanaasadoqi.dev.',
    focus: ['Next.js 16', 'MDX', 'Custom components', 'Content modeling'],
    proof:
      'The blog itself is the artifact — a system that gives full control over how I write and teach.',
    ctaLabel: 'blog.hanaasadoqi.dev',
    ctaHref: 'https://blog.hanaasadoqi.dev',
  },
];

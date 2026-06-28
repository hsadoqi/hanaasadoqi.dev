import type { SystemCard } from '../types';

export const systemCards: SystemCard[] = [
  {
    title: 'Model the real workflow first',
    description:
      'Before writing code, understand the actual process — who does what, in what order, under what conditions. Software that ignores real workflow creates workarounds.',
    businessContext:
      'The most common reason internal tools fail is that they model the ideal, not the real.',
    example:
      'Useful when mapping payroll runs, approval paths, corrections, and the handoffs between accountants, managers, and admins.',
    projects: ['Generafi', 'Synapcity'],
    writing: ['Workflow state machines', 'Building for operators'],
    receipts: [
      {
        label: 'Generafi workflow model',
        type: 'case study',
        status: 'draft',
      },
      {
        label: 'Why every workflow eventually turns into a state machine',
        type: 'essay',
        status: 'planned',
      },
    ],
  },
  {
    title: 'Permissions are product decisions',
    description:
      'Who can see and do what is not a security checkbox — it shapes how users understand the system. Design it early, in the data model, not the UI layer.',
    businessContext:
      'Retrofitting permissions onto existing data is expensive and brittle.',
    example:
      'Shows up when org structure, legal responsibility, and day-to-day work do not match a generic admin/member model.',
    projects: ['Generafi', 'Synapcity'],
    writing: ['Accountants and permissions', 'Generic SaaS permissions'],
    receipts: [
      {
        label:
          "Accountants don't think about permissions the way developers do",
        type: 'essay',
        status: 'draft',
      },
      {
        label: 'Generafi RBAC sketch',
        type: 'decision note',
        status: 'planned',
      },
    ],
  },
  {
    title: 'Reliability is a user experience',
    description:
      'A system that is technically correct but unreliable erodes trust fast. Consistency, predictable behavior, and graceful failure are features, not extras.',
    businessContext:
      "Users stop using tools they can't trust, even if the alternative is worse.",
    example:
      'Applies to calculations, exports, saved state, and every boring interaction users depend on repeatedly.',
    projects: ['Generafi', 'Internal tooling'],
    writing: ['Reliable software is UX'],
    receipts: [
      {
        label: 'Payroll calculation history',
        type: 'implementation note',
        status: 'planned',
      },
    ],
  },
  {
    title: 'Edge cases reveal the system',
    description:
      "The weird cases — partial failures, concurrent edits, retroactive corrections — tell you whether your model is actually right. Don't defer them.",
    businessContext:
      'Edge cases in production are expensive. Edge cases in design are just thinking.',
    example:
      'A retroactive payroll correction is not an edge case if the business needs to explain it later.',
    projects: ['Generafi'],
    writing: ['Workflow state machines'],
    receipts: [
      {
        label: 'Retroactive correction flow',
        type: 'decision note',
        status: 'planned',
      },
    ],
  },
  {
    title: 'Internal tools deserve care',
    description:
      "Internal tools that save hours every day have compounding value. They don't need a beautiful interface, but they need to be trustworthy and maintainable.",
    businessContext:
      'The line between "internal tool" and "core product" is thinner than people admit.',
    example:
      'A tool used daily by operators should be designed around speed, confidence, and recoverability.',
    projects: ['Stitch Fix', 'Generafi'],
    writing: ['Building for operators'],
    receipts: [
      {
        label: 'Internal tooling lessons',
        type: 'essay',
        status: 'planned',
      },
    ],
  },
  {
    title: 'Auditability creates trust',
    description:
      'Knowing who changed what, when, and why is useful for debugging, compliance, and customer conversations. Build it in from the start.',
    businessContext:
      'You will always need this eventually. Adding it retroactively is much harder.',
    example:
      'Payroll, permissions, and compliance workflows need a history that humans can actually understand.',
    projects: ['Generafi'],
    writing: ['Audit trails as product design'],
    receipts: [
      {
        label: 'Audit trail design notes',
        type: 'decision note',
        status: 'planned',
      },
    ],
  },
  {
    title: 'Documentation is part of the product',
    description:
      'Decision records, API docs, and runbooks are not optional polish. They reduce onboarding time, prevent mistakes, and keep context alive as teams grow.',
    businessContext:
      "Institutional knowledge that lives only in people's heads is a liability.",
    example:
      'Useful when a project needs decision history, not just final implementation notes.',
    projects: ['Synapcity', 'Blog'],
    writing: ['Decision records', 'Knowledge structure'],
    receipts: [
      {
        label: 'Synapcity knowledge model',
        type: 'case study',
        status: 'planned',
      },
    ],
  },
  {
    title: 'Ship useful before perfect',
    description:
      'A working system that solves the real problem is more valuable than an elegant system that solves a theoretical one. Iterate on real feedback.',
    businessContext:
      'Knowing when to stop building is as important as knowing what to build.',
    example:
      'A constraint for avoiding impressive but premature features, especially in early product validation.',
    projects: ['Synapcity', 'Blog'],
    writing: ['Removing realtime collaboration'],
    receipts: [
      {
        label: 'Why I removed real-time collaboration from Synapcity',
        type: 'essay',
        status: 'planned',
      },
    ],
  },
];

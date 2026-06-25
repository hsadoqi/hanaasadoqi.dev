export const systemCards = [
  {
    title: 'Model the real workflow first',
    description:
      'Before writing code, understand the actual process — who does what, in what order, under what conditions. Software that ignores real workflow creates workarounds.',
    businessContext:
      'The most common reason internal tools fail is that they model the ideal, not the real.',
  },
  {
    title: 'Permissions are product decisions',
    description:
      'Who can see and do what is not a security checkbox — it shapes how users understand the system. Design it early, in the data model, not the UI layer.',
    businessContext:
      'Retrofitting permissions onto existing data is expensive and brittle.',
  },
  {
    title: 'Reliability is a user experience',
    description:
      'A system that is technically correct but unreliable erodes trust fast. Consistency, predictable behavior, and graceful failure are features, not extras.',
    businessContext:
      "Users stop using tools they can't trust, even if the alternative is worse.",
  },
  {
    title: 'Edge cases reveal the system',
    description:
      "The weird cases — partial failures, concurrent edits, retroactive corrections — tell you whether your model is actually right. Don't defer them.",
    businessContext:
      'Edge cases in production are expensive. Edge cases in design are just thinking.',
  },
  {
    title: 'Internal tools deserve care',
    description:
      "Internal tools that save hours every day have compounding value. They don't need a beautiful interface, but they need to be trustworthy and maintainable.",
    businessContext:
      'The line between "internal tool" and "core product" is thinner than people admit.',
  },
  {
    title: 'Auditability creates trust',
    description:
      'Knowing who changed what, when, and why is useful for debugging, compliance, and customer conversations. Build it in from the start.',
    businessContext:
      'You will always need this eventually. Adding it retroactively is much harder.',
  },
  {
    title: 'Documentation is part of the product',
    description:
      'Decision records, API docs, and runbooks are not optional polish. They reduce onboarding time, prevent mistakes, and keep context alive as teams grow.',
    businessContext:
      "Institutional knowledge that lives only in people's heads is a liability.",
  },
  {
    title: 'Ship useful before perfect',
    description:
      'A working system that solves the real problem is more valuable than an elegant system that solves a theoretical one. Iterate on real feedback.',
    businessContext:
      'Knowing when to stop building is as important as knowing what to build.',
  },
];

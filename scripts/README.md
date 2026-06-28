# Project Data Validation

This directory contains validation scripts for project content integrity.

## `validate-project-data.mjs`

Validates that:

1. Every internal `/projects/[slug]` link in `src/data/projects-data.ts` has a matching case-study JSON file in `src/data/projects-show/`
2. Every case-study JSON file is accounted for in the project index data (or explicitly allowed as unreferenced)

### Running the Validator

```bash
pnpm validate:content
```

### What It Checks

- **Contract 1**: All `caseStudySlug` references in `projects-data.ts` must have a corresponding `.json` file
  - Example: if `caseStudySlug: 'generafi'`, then `src/data/projects-show/generafi.json` must exist
  - **Failure**: Script exits with code 1

- **Contract 2**: All JSON files in `src/data/projects-show/` should be referenced
  - (Warnings only; does not fail)
  - Useful for detecting orphaned content

### Integration

Add to your CI pipeline or pre-commit hook:

```bash
pnpm validate:content
```

Or combine with other checks:

```bash
pnpm typecheck && pnpm lint && pnpm validate:content && pnpm build
```

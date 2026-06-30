# Project Data Validation

This directory contains validation scripts for project content integrity.

## `validate-project-data.mjs`

Validates that:

1. Every project MDX file has a unique slug matching its content path.
2. Every case-study MDX file has a unique slug matching its content path.
3. Every case-study `projectSlug` points at an existing project.
4. Every project `relatedCaseStudies` entry points at an existing case study.
5. Every case study is represented by its owning project's `relatedCaseStudies`.

### Running the Validator

```bash
pnpm validate:content
```

### What It Checks

- **Contract 1**: Project and case-study slugs must match their MDX content paths
  - Example: `content/projects/generafi.mdx` must use `slug: 'generafi'`
  - **Failure**: Script exits with code 1

- **Contract 2**: Case-study ownership must be consistent in both directions
  - A case study's `projectSlug` must reference a real project
  - A project's `relatedCaseStudies` should include every owned case study
  - Missing reverse links are warnings; invalid slugs are failures

### Integration

Add to your CI pipeline or pre-commit hook:

```bash
pnpm validate:content
```

Or combine with other checks:

```bash
pnpm typecheck && pnpm lint && pnpm validate:content && pnpm build
```

#!/usr/bin/env node

/**
 * Validates current portfolio content contracts:
 * 1. Every project MDX file has a unique slug matching its content path.
 * 2. Every case-study MDX file has a unique slug matching its content path.
 * 3. Every case-study projectSlug points at an existing project.
 * 4. Every project relatedCaseStudies entry points at an existing case study.
 * 5. Every case study is represented by its owning project's relatedCaseStudies.
 */

import { createBuilder } from '@content-collections/core';
import { writeFile } from 'fs/promises';

async function loadCollections() {
  const builder = await createBuilder('content-collections.ts');
  await builder.build();
  await writeFile(
    '.content-collections/generated/package.json',
    '{"type":"module"}\n',
  );

  return import(`../.content-collections/generated/index.js?ts=${Date.now()}`);
}

function validateUniqueSlug(items, label, errors) {
  const seen = new Map();

  for (const item of items) {
    const slug = item.slug;
    const contentPath = item._meta?.path;

    if (!slug) {
      errors.push(`${label} "${contentPath}" is missing a slug.`);
      continue;
    }

    if (contentPath && slug !== contentPath) {
      errors.push(
        `${label} slug mismatch in ${contentPath}: expected "${contentPath}", got "${slug}".`,
      );
    }

    if (seen.has(slug)) {
      errors.push(
        `${label} slug "${slug}" is duplicated in ${contentPath} and ${seen.get(
          slug,
        )}.`,
      );
    }

    seen.set(slug, contentPath);
  }

  return new Set(items.map((item) => item.slug).filter(Boolean));
}

async function validate() {
  const { allCaseStudies, allProjects } = await loadCollections();
  const errors = [];
  const warnings = [];
  const projectSlugs = validateUniqueSlug(allProjects, 'Project', errors);
  const caseStudySlugs = validateUniqueSlug(
    allCaseStudies,
    'Case study',
    errors,
  );
  const projectsBySlug = new Map(
    allProjects.map((project) => [project.slug, project]),
  );
  const caseStudiesBySlug = new Map(
    allCaseStudies.map((caseStudy) => [caseStudy.slug, caseStudy]),
  );

  for (const caseStudy of allCaseStudies) {
    const projectSlug = caseStudy.projectSlug ?? caseStudy.project_slug;

    if (!projectSlug) {
      errors.push(`Case study "${caseStudy.slug}" is missing projectSlug.`);
      continue;
    }

    if (!projectSlugs.has(projectSlug)) {
      errors.push(
        `Case study "${caseStudy.slug}" references missing project "${projectSlug}".`,
      );
      continue;
    }

    const owner = projectsBySlug.get(projectSlug);
    const related = owner?.relatedCaseStudies ?? [];

    if (!related.includes(caseStudy.slug)) {
      warnings.push(
        `Case study "${caseStudy.slug}" belongs to "${projectSlug}" but is not listed in that project's relatedCaseStudies.`,
      );
    }
  }

  for (const project of allProjects) {
    const related = project.relatedCaseStudies ?? [];

    for (const slug of related) {
      if (!caseStudySlugs.has(slug)) {
        errors.push(
          `Project "${project.slug}" references missing case study "${slug}".`,
        );
        continue;
      }

      const caseStudy = caseStudiesBySlug.get(slug);
      const ownerSlug = caseStudy?.projectSlug ?? caseStudy?.project_slug;

      if (ownerSlug !== project.slug) {
        errors.push(
          `Project "${project.slug}" references case study "${slug}", but it belongs to "${ownerSlug}".`,
        );
      }
    }
  }

  console.log('\nMDX Content Contract Validation\n');
  console.log(`Projects: ${allProjects.map((item) => item.slug).join(', ')}`);
  console.log(
    `Case studies: ${allCaseStudies.map((item) => item.slug).join(', ')}\n`,
  );

  for (const warning of warnings) {
    console.warn(`WARNING: ${warning}`);
  }

  if (warnings.length > 0) {
    console.log('');
  }

  if (errors.length > 0) {
    for (const error of errors) {
      console.error(`ERROR: ${error}`);
    }

    console.error('\nValidation failed\n');
    process.exit(1);
  }

  console.log('All MDX content contracts are valid\n');
}

validate().catch((error) => {
  console.error(error);
  process.exit(1);
});

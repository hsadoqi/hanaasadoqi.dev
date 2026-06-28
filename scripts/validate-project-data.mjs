#!/usr/bin/env node

/**
 * Validates current portfolio content contracts:
 * 1. Every project JSON has a unique slug matching its filename.
 * 2. Every case-study JSON has a unique slug matching its filename.
 * 3. Every case-study project_slug points at an existing project.
 * 4. Every project relatedCaseStudies entry points at an existing case study.
 * 5. Every case study is represented by its owning project's relatedCaseStudies.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const projectsDir = path.join(
  rootDir,
  'src/features/projects/data/final-projects',
);
const caseStudiesDir = path.join(
  rootDir,
  'src/features/case-studies/data/final-studies',
);

function readJsonFiles(dir) {
  if (!fs.existsSync(dir)) {
    throw new Error(`Missing data directory: ${path.relative(rootDir, dir)}`);
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.json') && !file.includes('TEMPLATE'))
    .sort()
    .map((file) => {
      const filePath = path.join(dir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      return {
        data,
        file,
        filePath,
        slugFromFile: path.basename(file, '.json'),
      };
    });
}

function validateUniqueSlug(records, label, errors) {
  const seen = new Map();

  for (const record of records) {
    const slug = record.data.slug;
    const relativePath = path.relative(rootDir, record.filePath);

    if (!slug) {
      errors.push(`${label} file ${relativePath} is missing a slug.`);
      continue;
    }

    if (slug !== record.slugFromFile) {
      errors.push(
        `${label} slug mismatch in ${relativePath}: expected "${record.slugFromFile}", got "${slug}".`,
      );
    }

    if (seen.has(slug)) {
      errors.push(
        `${label} slug "${slug}" is duplicated in ${relativePath} and ${seen.get(slug)}.`,
      );
    }

    seen.set(slug, relativePath);
  }

  return new Set(records.map((record) => record.data.slug).filter(Boolean));
}

function validate() {
  const errors = [];
  const warnings = [];
  const projects = readJsonFiles(projectsDir);
  const caseStudies = readJsonFiles(caseStudiesDir);
  const projectSlugs = validateUniqueSlug(projects, 'Project', errors);
  const caseStudySlugs = validateUniqueSlug(caseStudies, 'Case study', errors);
  const projectsBySlug = new Map(
    projects.map((record) => [record.data.slug, record]),
  );
  const caseStudiesBySlug = new Map(
    caseStudies.map((record) => [record.data.slug, record]),
  );

  for (const record of caseStudies) {
    const projectSlug = record.data.project_slug;
    const relativePath = path.relative(rootDir, record.filePath);

    if (!projectSlug) {
      errors.push(`Case study ${relativePath} is missing project_slug.`);
      continue;
    }

    if (!projectSlugs.has(projectSlug)) {
      errors.push(
        `Case study "${record.data.slug}" references missing project "${projectSlug}".`,
      );
      continue;
    }

    const owner = projectsBySlug.get(projectSlug);
    const related = owner?.data.relatedCaseStudies ?? [];

    if (!related.includes(record.data.slug)) {
      warnings.push(
        `Case study "${record.data.slug}" belongs to "${projectSlug}" but is not listed in that project's relatedCaseStudies.`,
      );
    }
  }

  for (const record of projects) {
    const related = record.data.relatedCaseStudies ?? [];

    for (const slug of related) {
      if (!caseStudySlugs.has(slug)) {
        errors.push(
          `Project "${record.data.slug}" references missing case study "${slug}".`,
        );
        continue;
      }

      const caseStudy = caseStudiesBySlug.get(slug);
      if (caseStudy?.data.project_slug !== record.data.slug) {
        errors.push(
          `Project "${record.data.slug}" references case study "${slug}", but it belongs to "${caseStudy?.data.project_slug}".`,
        );
      }
    }
  }

  console.log('\nProject Data Contract Validation\n');
  console.log(
    `Projects: ${projects.map((record) => record.data.slug).join(', ')}`,
  );
  console.log(
    `Case studies: ${caseStudies.map((record) => record.data.slug).join(', ')}\n`,
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

  console.log('All project data contracts are valid\n');
}

validate();

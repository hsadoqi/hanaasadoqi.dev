import { compileMDX } from '@content-collections/mdx';
import { defineCollection, defineConfig } from '@content-collections/core';
import { z } from 'zod';

const statusSchema = z.enum([
  'brainstorming',
  'in-progress',
  'launched',
  'archived',
  'concept',
  'design',
  'development',
  'draft',
  'planned',
  'published',
]);

const statusVariantSchema = z.enum(['blue', 'green', 'amber', 'muted']);
const visibilitySchema = z.enum(['public', 'hidden', 'draft']);
const contentTypeSchema = z.enum([
  'project',
  'case-study',
  'article',
  'experiment',
]);
const categorySchema = z.enum([
  'product',
  'platform',
  'frontend',
  'full-stack',
  'design-system',
  'prototype',
  'research',
]);
const maturitySchema = z.enum([
  'concept',
  'prototype',
  'active',
  'shipped',
  'archived',
]);
const dateStringSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD dates.');

const datesSchema = z.object({
  year: z.number().int().optional(),
  started: dateStringSchema.optional(),
  ended: dateStringSchema.optional(),
  published: dateStringSchema.optional(),
  updated: dateStringSchema.optional(),
});

const linkSchema = z.object({
  label: z.string(),
  url: z.string(),
  kind: z.enum(['project', 'case-study', 'external', 'unavailable']).optional(),
  isDisabled: z.boolean().default(false),
});

const baseSchema = z.object({
  content: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  type: contentTypeSchema.optional(),
  category: categorySchema,
  maturity: maturitySchema,
  status: statusSchema,
  statusVariant: statusVariantSchema.default('muted'),
  visibility: visibilitySchema.default('public'),
  dates: datesSchema.optional(),
  role: z.string().optional(),
  tags: z.array(z.string()).default([]),
  scope: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  coverImage: z.string().optional(),
  previewImage: z.string().optional(),
  links: z.array(linkSchema).default([]),
  problem: z.string().optional(),
  solution: z.string().optional(),
  impact: z.string().optional(),
  proof: z.string().optional(),
  techStack: z.array(z.string()).default([]),
  outcomes: z.array(z.string()).default([]),
  learnings: z.array(z.string()).default([]),
  challenges: z.array(z.string()).default([]),
  timeline: z
    .array(
      z.object({
        label: z.string(),
        date: dateStringSchema.optional(),
        description: z.string(),
      }),
    )
    .default([]),
  architecture: z
    .object({
      decisions: z.number().int().optional(),
      diagrams: z.number().int().optional(),
      services: z.array(z.string()).optional(),
      patterns: z.array(z.string()).optional(),
      highlights: z
        .array(
          z.object({
            title: z.string(),
            description: z.string(),
          }),
        )
        .optional(),
    })
    .optional(),
  isComingSoon: z.boolean().default(false),
  isDisabled: z.boolean().default(false),
});

const projectSchema = baseSchema.extend({
  relatedCaseStudies: z.array(z.string()).default([]),
});

const caseStudySchema = baseSchema.extend({
  projectSlug: z.string(),
});

const articleSchema = baseSchema;

function statusColor(status: z.infer<typeof statusSchema>) {
  if (status === 'launched' || status === 'published') return 'green';
  if (status === 'in-progress' || status === 'development') return 'blue';
  if (status === 'concept' || status === 'design' || status === 'planned') {
    return 'amber';
  }
  return 'muted';
}

function getReadingTime(content: string) {
  const text = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^import\s.+$/gm, ' ')
    .replace(/^export\s.+$/gm, ' ')
    .replace(/<\/?[\w.:-]+[^>]*>/g, ' ')
    .replace(/[{}[\](),:;]/g, ' ');
  const words =
    text.match(/[\p{L}\p{N}]+(?:['-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  const minutes = Math.max(1, Math.ceil(words / 225));

  return {
    words,
    minutes,
    text: `${minutes} min read`,
  };
}

function toDisplayDocument<T extends z.infer<typeof baseSchema>>(
  document: T & { content: string; _meta: { fileName: string } },
  mdx: string,
  type: z.infer<typeof contentTypeSchema>,
) {
  const ctaItems = document.links.map((link) => ({
    label: link.label,
    link: link.url,
  }));

  const linkItems = document.links.map((link) => ({
    href: link.url,
    label: link.label,
    isExternal: /^https?:\/\//.test(link.url),
    isDisabled: link.isDisabled,
    kind: link.kind ?? (/^https?:\/\//.test(link.url) ? 'external' : 'project'),
  }));

  return {
    ...document,
    type: document.type ?? type,
    isComingSoon: document.visibility === 'draft' || document.isComingSoon,
    isDisabled: document.visibility === 'draft' || document.isDisabled,
    mdx,
    readingTime: getReadingTime(document.content),
    subtitle: document.description,
    hero: {
      eyebrow: document.featured ? 'Featured Project' : 'Project',
      badges: [
        {
          text: document.status,
          color: statusColor(document.status),
        },
      ],
      image: {
        label: `${document.title} hero image`,
        src: document.coverImage ?? '',
        alt: document.title,
      },
    },
    sections: [],
    ctaItems,
    linkItems,
    status: {
      value: document.status,
      variant: document.statusVariant,
    },
    images: document.previewImage
      ? [
          {
            src: document.previewImage,
            alt: document.title,
          },
        ]
      : [],
  };
}

const projects = defineCollection({
  name: 'projects',
  directory: 'content/projects',
  include: '**/*.mdx',
  schema: projectSchema,
  async transform(document, context) {
    const mdx = await compileMDX(context, document);
    return toDisplayDocument(document, mdx, 'project');
  },
});

const caseStudies = defineCollection({
  name: 'caseStudies',
  directory: 'content/case-studies',
  include: '**/*.mdx',
  schema: caseStudySchema,
  async transform(document, context) {
    const mdx = await compileMDX(context, document);
    return {
      ...toDisplayDocument(document, mdx, 'case-study'),
      project_slug: document.projectSlug,
      hero: {
        eyebrow: 'Case Study',
        badges: [
          {
            text: document.status,
            color: statusColor(document.status),
          },
        ],
        image: {
          label: `${document.title} case study image`,
          src: document.coverImage ?? '',
          alt: document.title,
        },
      },
    };
  },
});

const articles = defineCollection({
  name: 'articles',
  directory: 'content/articles',
  include: '**/*.mdx',
  schema: articleSchema,
  async transform(document, context) {
    const mdx = await compileMDX(context, document);
    return toDisplayDocument(document, mdx, 'article');
  },
});

export default defineConfig({
  content: [projects, caseStudies, articles],
});

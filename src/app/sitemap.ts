import type { MetadataRoute } from 'next';
import { loadPublicCaseStudies } from '@/features/case-studies/lib';
import { getPublicProjectSlugs } from '@/features/projects/lib';

const siteUrl = 'https://hanaasadoqi.dev';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, caseStudies] = await Promise.all([
    getPublicProjectSlugs(),
    loadPublicCaseStudies(),
  ]);

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projectSlugs.map((slug) => ({
      url: `${siteUrl}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...caseStudies.map((caseStudy) => ({
      url: `${siteUrl}/projects/${caseStudy.project_slug}/${caseStudy.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}

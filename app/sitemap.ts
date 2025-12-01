// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { fetchCemeteries } from '@/src/lib/cemeteries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  const cemeteries = await fetchCemeteries();

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/jangji`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/company`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  const cemeteryUrls: MetadataRoute.Sitemap = cemeteries.map((c) => {
    const updated =
      (c.updatedAt as string | null) || (c.createdAt as string | null);

    return {
      url: `${baseUrl}/jangji/${c.id}`,
      lastModified: updated ? new Date(updated) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    };
  });

  return [...staticUrls, ...cemeteryUrls];
}

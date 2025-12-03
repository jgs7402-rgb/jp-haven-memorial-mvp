// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'; // TODO: set real domain in Vercel

  const now = new Date();

  const staticPaths: string[] = ['', '/jangji', '/company'];

  const routes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }));

  // TODO: Later, add dynamic jangji/[id] URLs by querying Supabase cemeteries.
  // Example:
  // const cemeteries = await fetchCemeteries();
  // const cemeteryUrls = cemeteries.map((c) => ({
  //   url: `${baseUrl}/jangji/${c.id}`,
  //   lastModified: c.updatedAt ? new Date(c.updatedAt) : now,
  // }));
  // return [...routes, ...cemeteryUrls];

  return routes;
}

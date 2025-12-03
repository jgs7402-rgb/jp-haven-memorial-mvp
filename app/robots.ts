// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'; // TODO: set real domain in Vercel

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

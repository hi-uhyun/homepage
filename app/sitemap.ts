import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hiuhyun.com';

const locales = ['ko', 'en'] as const;
const pages = ['', '/portfolio', '/about', '/schedule'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    const koUrl = `${SITE_URL}/ko${page}`;
    const enUrl = `${SITE_URL}/en${page}`;

    entries.push({
      url: koUrl,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: {
          ko: koUrl,
          en: enUrl,
        },
      },
    });

    entries.push({
      url: enUrl,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: {
          ko: koUrl,
          en: enUrl,
        },
      },
    });
  }

  return entries;
}

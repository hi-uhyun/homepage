import type { Profile, PortfolioItem } from '@/lib/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hiuhyun.com';

export function getPersonJsonLd(profile: Profile) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name_ko,
    alternateName: profile.name_en,
    jobTitle: ['성우', '배우', '가수'],
    url: SITE_URL,
    image: `${SITE_URL}${profile.profileImageUrl}`,
    sameAs: [
      profile.sns.youtube,
      profile.sns.instagram,
    ],
  };
}

export function getVideoJsonLd(item: PortfolioItem, locale: string) {
  const name = locale === 'ko' ? item.title_ko : item.title_en;
  const description =
    (locale === 'ko' ? item.description_ko : item.description_en) ?? name;

  // Convert youtube.com/watch?v=ID to youtube.com/embed/ID
  const videoId = item.youtubeUrl.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/
  )?.[1];
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : item.youtubeUrl;

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: item.thumbnailUrl,
    embedUrl,
  };
}

import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { getProfile } from '@/lib/data';
import ProfileDetail from '@/components/about/ProfileDetail';
import CareerTimeline from '@/components/about/CareerTimeline';
import AwardsList from '@/components/about/AwardsList';
import MediaClippings from '@/components/about/MediaClippings';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const profile = getProfile();
  const name = locale === 'ko' ? profile.name_ko : profile.name_en;
  const tagline = locale === 'ko' ? profile.tagline_ko : profile.tagline_en;

  return {
    title: `${name} — ${locale === 'ko' ? '소개' : 'About'}`,
    description: tagline,
  };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const t = await getTranslations('about');
  const profile = getProfile();

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-20 lg:gap-28">
          <ProfileDetail profile={profile} locale={locale} />

          <hr className="border-neutral-100" />

          <CareerTimeline
            career={profile.career}
            locale={locale}
            heading={t('career')}
          />

          <hr className="border-neutral-100" />

          <AwardsList
            awards={profile.awards}
            locale={locale}
            heading={t('awards')}
          />

          <hr className="border-neutral-100" />

          <MediaClippings
            clippings={profile.mediaClippings}
            locale={locale}
            heading={t('media')}
          />
        </div>
      </div>
    </main>
  );
}

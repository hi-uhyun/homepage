import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { getUpcomingSchedule, getProfile } from '@/lib/data';
import EventList from '@/components/schedule/EventList';
import CalendlyEmbed from '@/components/schedule/CalendlyEmbed';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const profile = getProfile();
  const name = locale === 'ko' ? profile.name_ko : profile.name_en;

  return {
    title: `${name} — ${locale === 'ko' ? '일정' : 'Schedule'}`,
    description:
      locale === 'ko'
        ? '박유현의 다가오는 공연, 팬 미팅, 이벤트 일정을 확인하세요.'
        : "Check Hiuhyun's upcoming concerts, fan meetings, and events.",
  };
}

export default async function SchedulePage() {
  const locale = await getLocale();
  const t = await getTranslations('schedule');
  const profile = getProfile();
  const events = getUpcomingSchedule();

  const bookDescription = t('bookDescription');

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-20 lg:gap-28">
          {/* Upcoming Events */}
          <EventList events={events} locale={locale} heading={t('upcoming')} />

          {/* Calendly booking section */}
          <section aria-labelledby="booking-heading">
            <h2
              id="booking-heading"
              className="text-2xl font-bold text-neutral-900 mb-3"
            >
              {t('bookTime')}
            </h2>
            <p className="text-sm text-neutral-500 mb-8 max-w-xl leading-relaxed">
              {bookDescription}
            </p>
            <CalendlyEmbed
              kakaoOpenChatUrl={profile.sns.kakaoOpenChat}
              locale={locale}
            />
          </section>
        </div>
      </div>
    </main>
  );
}

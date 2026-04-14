import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { getProfile, getFeaturedPortfolio, getUpcomingSchedule } from '@/lib/data';
import HeroSection from '@/components/home/HeroSection';
import AboutPreview from '@/components/home/AboutPreview';
import PortfolioPreview from '@/components/home/PortfolioPreview';
import SchedulePreview from '@/components/home/SchedulePreview';
import ContactSection from '@/components/home/ContactSection';

export const metadata: Metadata = {
  title: '박유현 — 성우 · 배우 · 가수',
  keywords: ['박유현', '성우', '배우', '가수', '보이스오버', '광고성우', 'Hiuhyun', 'voice actor'],
};

export default async function HomePage() {
  const locale = await getLocale();
  const profile = getProfile();
  const featuredPortfolio = getFeaturedPortfolio();
  const upcomingEvents = getUpcomingSchedule();

  return (
    <main>
      <HeroSection profile={profile} locale={locale} />
      <AboutPreview profile={profile} locale={locale} />
      <PortfolioPreview items={featuredPortfolio} locale={locale} />
      <SchedulePreview events={upcomingEvents} locale={locale} />
      <ContactSection sns={profile.sns} locale={locale} />
    </main>
  );
}

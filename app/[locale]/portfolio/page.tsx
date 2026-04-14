import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { getPortfolio } from '@/lib/data';
import { PortfolioFilter } from '@/components/portfolio/PortfolioFilter';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';

export const metadata: Metadata = {
  title: '포트폴리오',
  description:
    '박유현의 성우, 배우, 가수 포트폴리오. 광고 보이스오버, 드라마 출연작, 음악 작품을 확인하세요.',
  keywords: ['박유현 포트폴리오', '성우 작품', '배우 작품', '가수 작품', '보이스오버'],
};

export default async function PortfolioPage() {
  const locale = await getLocale();
  const t = await getTranslations('portfolio');
  const items = getPortfolio();

  const translations = {
    all: t('all'),
    voiceActing: t('voiceActing'),
    acting: t('acting'),
    singing: t('singing'),
  };

  const emptyLabel = locale === 'ko' ? '해당하는 작품이 없습니다.' : 'No items found.';

  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            {t('title')}
          </h1>
        </header>

        <Suspense fallback={<PortfolioSkeleton />}>
          <div className="space-y-8">
            <PortfolioFilter
              items={items}
              locale={locale}
              translations={translations}
            />
            <PortfolioGrid
              items={items}
              locale={locale}
              emptyLabel={emptyLabel}
            />
          </div>
        </Suspense>
      </div>
    </div>
  );
}

function PortfolioSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex gap-2">
        {[80, 100, 70, 120].map((w) => (
          <div
            key={w}
            className="h-9 rounded-full bg-neutral-100 animate-pulse"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-neutral-200 overflow-hidden">
            <div className="aspect-video bg-neutral-100 animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-neutral-100 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-neutral-100 rounded animate-pulse w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

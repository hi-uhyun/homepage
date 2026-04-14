'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import type { PortfolioItem } from '@/lib/types';

interface PortfolioFilterProps {
  items: PortfolioItem[];
  locale: string;
  translations: {
    all: string;
    voiceActing: string;
    acting: string;
    singing: string;
  };
}

type CategoryFilter = 'all' | 'voice-acting' | 'acting' | 'singing';

export function PortfolioFilter({ items, locale, translations }: PortfolioFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = (searchParams.get('category') ?? 'all') as CategoryFilter;
  const currentTone = searchParams.get('tone') ?? 'all';

  const uniqueTones = Array.from(
    new Set(
      items
        .filter((item) => item.category === 'voice-acting' && item.tone)
        .map((item) => item.tone as string)
    )
  );

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === 'all') {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      }
      return current.toString();
    },
    [searchParams]
  );

  const handleCategoryChange = (category: CategoryFilter) => {
    const qs = createQueryString({ category: category === 'all' ? null : category, tone: null });
    router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  };

  const handleToneChange = (tone: string) => {
    const qs = createQueryString({ tone: tone === 'all' ? null : tone });
    router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  };

  const categories: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: translations.all },
    { value: 'voice-acting', label: translations.voiceActing },
    { value: 'acting', label: translations.acting },
    { value: 'singing', label: translations.singing },
  ];

  const toneAllLabel = locale === 'ko' ? '전체 톤' : 'All Tones';

  return (
    <div className="space-y-3">
      {/* Category tabs */}
      <div
        role="tablist"
        aria-label={locale === 'ko' ? '카테고리 필터' : 'Category filter'}
        className="flex flex-wrap gap-2"
      >
        {categories.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={currentCategory === value}
            onClick={() => handleCategoryChange(value)}
            className={[
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 border',
              currentCategory === value
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-white text-neutral-600 border-neutral-300 hover:border-neutral-500 hover:text-neutral-900',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tone sub-filters — only visible when voice-acting selected */}
      {currentCategory === 'voice-acting' && uniqueTones.length > 0 && (
        <div
          role="group"
          aria-label={locale === 'ko' ? '톤 필터' : 'Tone filter'}
          className="flex flex-wrap gap-2"
        >
          <button
            type="button"
            aria-pressed={currentTone === 'all'}
            onClick={() => handleToneChange('all')}
            className={[
              'px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 border',
              currentTone === 'all'
                ? 'bg-violet-700 text-white border-violet-700'
                : 'bg-white text-violet-600 border-violet-300 hover:border-violet-500',
            ].join(' ')}
          >
            {toneAllLabel}
          </button>
          {uniqueTones.map((tone) => (
            <button
              key={tone}
              type="button"
              aria-pressed={currentTone === tone}
              onClick={() => handleToneChange(tone)}
              className={[
                'px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 border',
                currentTone === tone
                  ? 'bg-violet-700 text-white border-violet-700'
                  : 'bg-white text-violet-600 border-violet-300 hover:border-violet-500',
              ].join(' ')}
            >
              {tone}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

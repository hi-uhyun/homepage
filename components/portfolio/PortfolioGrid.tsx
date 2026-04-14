'use client';

import { useSearchParams } from 'next/navigation';
import type { PortfolioItem as PortfolioItemType } from '@/lib/types';
import { PortfolioItem } from '@/components/portfolio/PortfolioItem';

interface PortfolioGridProps {
  items: PortfolioItemType[];
  locale: string;
  emptyLabel: string;
}

export function PortfolioGrid({ items, locale, emptyLabel }: PortfolioGridProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') ?? 'all';
  const currentTone = searchParams.get('tone') ?? 'all';

  const filtered = items.filter((item) => {
    if (currentCategory !== 'all' && item.category !== currentCategory) return false;
    if (currentCategory === 'voice-acting' && currentTone !== 'all' && item.tone !== currentTone) {
      return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="flex items-center justify-center py-24 text-neutral-400 text-sm">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((item) => (
        <PortfolioItem key={item.id} item={item} locale={locale} />
      ))}
    </div>
  );
}

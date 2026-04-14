'use client';

import { useState } from 'react';
import type { PortfolioItem as PortfolioItemType } from '@/lib/types';
import { extractVideoId, YouTubeEmbed } from '@/components/portfolio/YouTubeEmbed';

interface PortfolioItemProps {
  item: PortfolioItemType;
  locale: string;
}

const CATEGORY_LABELS: Record<string, { ko: string; en: string }> = {
  'voice-acting': { ko: '광고/성우', en: 'Voice Acting' },
  acting: { ko: '연기', en: 'Acting' },
  singing: { ko: '노래/공연', en: 'Singing' },
};

const CATEGORY_COLORS: Record<string, string> = {
  'voice-acting': 'bg-violet-100 text-violet-700',
  acting: 'bg-amber-100 text-amber-700',
  singing: 'bg-emerald-100 text-emerald-700',
};

export function PortfolioItem({ item, locale }: PortfolioItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const title = locale === 'ko' ? item.title_ko : item.title_en;
  const videoId = extractVideoId(item.youtubeUrl);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : item.thumbnailUrl;

  const categoryLabel =
    locale === 'ko'
      ? CATEGORY_LABELS[item.category]?.ko
      : CATEGORY_LABELS[item.category]?.en;
  const categoryColor = CATEGORY_COLORS[item.category] ?? 'bg-neutral-100 text-neutral-700';

  return (
    <article className="group rounded-xl overflow-hidden border border-neutral-200 bg-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
      {isExpanded ? (
        <div className="p-4 space-y-3">
          <YouTubeEmbed youtubeUrl={item.youtubeUrl} title={title} />
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-neutral-900 text-sm leading-snug">{title}</h3>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              aria-label="닫기"
              className="shrink-0 text-neutral-400 hover:text-neutral-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColor}`}>
              {categoryLabel}
            </span>
            {item.tone && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                {item.tone}
              </span>
            )}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="w-full text-left cursor-pointer"
          aria-label={`${title} 재생`}
        >
          <div className="relative aspect-video overflow-hidden bg-neutral-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-neutral-900 ml-1"
                  aria-hidden="true"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-2">
            <h3 className="font-semibold text-neutral-900 text-sm leading-snug line-clamp-2">
              {title}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColor}`}>
                {categoryLabel}
              </span>
              {item.tone && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                  {item.tone}
                </span>
              )}
            </div>
          </div>
        </button>
      )}
    </article>
  );
}

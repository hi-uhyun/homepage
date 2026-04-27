'use client';

import type { PortfolioItem } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

interface PortfolioSectionProps {
  category: string;
  label: string;
  items: PortfolioItem[];
  playlistUrl?: string;
  playlistLabel: string;
  viewAllUrl?: string;
  viewAllLabel?: string;
  locale: string;
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(/[?&]v=([^&#]+)/) || url.match(/youtu\.be\/([^?&#]+)/);
  return match ? match[1] : null;
}

function getThumbnailUrl(item: PortfolioItem): string {
  const videoId = extractYouTubeId(item.youtubeUrl);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  return '';
}

export default function PortfolioSection({
  category,
  label,
  items,
  playlistUrl,
  playlistLabel,
  viewAllUrl,
  viewAllLabel,
  locale,
}: PortfolioSectionProps) {
  const hasItems = items.length > 0;
  const hasPlaylist = !!playlistUrl;
  const hasViewAll = !!viewAllUrl && !!viewAllLabel;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const overflowing = el.scrollWidth - el.clientWidth > 4;
    setHasOverflow(overflowing);
    setCanLeft(el.scrollLeft > 4);
    setCanRight(overflowing && el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  if (!hasItems && !hasPlaylist && !hasViewAll) return null;

  return (
    <section id={category} aria-labelledby={`${category}-heading`} className="scroll-mt-20">
      {/* Section header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2
          id={`${category}-heading`}
          className="text-lg font-bold text-neutral-900 tracking-tight"
        >
          {label}
        </h2>

        <div className="flex items-center gap-2">
          {hasViewAll ? (
            <Link
              href={viewAllUrl!}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              {viewAllLabel}
              <svg
                aria-hidden="true"
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          ) : hasPlaylist ? (
            <a
              href={playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              {playlistLabel}
              <svg
                aria-hidden="true"
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          ) : null}
        </div>
      </div>

      {/* Horizontal scroll row */}
      {hasItems && (
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="edge-fade-x">
            <div
              ref={scrollerRef}
              className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 sm:px-14 lg:px-16"
              style={{ overscrollBehaviorX: 'contain' }}
            >
              {items.map((item) => {
                const title = locale === 'ko' ? item.title_ko : item.title_en;
                const thumbnailSrc = getThumbnailUrl(item);

                return (
                  <a
                    key={item.id}
                    href={item.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-56 flex-shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-neutral-100 bg-white shadow-sm transition-shadow hover:shadow-md sm:w-64"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
                      {thumbnailSrc ? (
                        <Image
                          src={thumbnailSrc}
                          alt={title}
                          fill
                          sizes="(min-width: 640px) 256px, 224px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-neutral-200">
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 40 40"
                            fill="none"
                            aria-hidden="true"
                            className="text-neutral-400"
                          >
                            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
                            <path d="M16 13l11 7-11 7V13z" fill="currentColor" />
                          </svg>
                        </div>
                      )}
                      {/* Play overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 48 48"
                          fill="none"
                          aria-hidden="true"
                          className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg"
                        >
                          <circle cx="24" cy="24" r="22" fill="currentColor" fillOpacity="0.8" />
                          <path d="M20 16l12 8-12 8V16z" fill="#000" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="line-clamp-2 text-xs font-medium text-neutral-800 leading-snug">{title}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {hasOverflow && (
            <>
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="이전"
                disabled={!canLeft}
                className="absolute left-2 top-[35%] z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/95 text-neutral-700 shadow-md backdrop-blur transition hover:border-neutral-300 hover:text-neutral-900 disabled:pointer-events-none disabled:opacity-0 sm:flex lg:left-3"
              >
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="다음"
                disabled={!canRight}
                className="absolute right-2 top-[35%] z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/95 text-neutral-700 shadow-md backdrop-blur transition hover:border-neutral-300 hover:text-neutral-900 disabled:pointer-events-none disabled:opacity-0 sm:flex lg:right-3"
              >
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}

      {/* Playlist link for sections with no items */}
      {!hasItems && hasPlaylist && (
        <a
          href={playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:border-neutral-300"
        >
          <svg
            aria-hidden="true"
            className="w-4 h-4 text-red-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          {playlistLabel}
        </a>
      )}
    </section>
  );
}

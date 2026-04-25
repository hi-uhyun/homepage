import type { PortfolioItem } from '@/lib/types';
import Image from 'next/image';

interface PortfolioSectionProps {
  category: string;
  label: string;
  items: PortfolioItem[];
  playlistUrl?: string;
  playlistLabel: string;
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
  locale,
}: PortfolioSectionProps) {
  const hasItems = items.length > 0;
  const hasPlaylist = !!playlistUrl;

  if (!hasItems && !hasPlaylist) return null;

  return (
    <section aria-labelledby={`${category}-heading`}>
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <h2
          id={`${category}-heading`}
          className="text-lg font-bold text-neutral-900 tracking-tight"
        >
          {label}
        </h2>
        {hasPlaylist && (
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
        )}
      </div>

      {/* Horizontal scroll row */}
      {hasItems && (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
          {items.map((item) => {
            const title = locale === 'ko' ? item.title_ko : item.title_en;
            const thumbnailSrc = getThumbnailUrl(item);

            return (
              <a
                key={item.id}
                href={item.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-shrink-0 w-56 sm:w-64 flex flex-col overflow-hidden rounded-lg border border-neutral-100 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
                  {thumbnailSrc ? (
                    <Image
                      src={thumbnailSrc}
                      alt={title}
                      fill
                      sizes="224px"
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

          {/* Playlist card at the end */}
          {hasPlaylist && (
            <a
              href={playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-shrink-0 w-56 sm:w-64 flex flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-neutral-200 bg-neutral-50 transition-colors hover:bg-neutral-100 hover:border-neutral-300"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-neutral-300 group-hover:text-neutral-500 transition-colors mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              <span className="text-xs font-medium text-neutral-400 group-hover:text-neutral-600 transition-colors">
                {playlistLabel}
              </span>
            </a>
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

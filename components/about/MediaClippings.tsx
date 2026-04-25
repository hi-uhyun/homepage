import type { MediaClipping } from '@/lib/types';

interface MediaClippingsProps {
  clippings: MediaClipping[];
  locale: string;
  heading: string;
}

function formatDate(dateStr: string, locale: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat(locale === 'ko' ? 'ko-KR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(/[?&]v=([^&#]+)/) || url.match(/youtu\.be\/([^?&#]+)/);
  return match ? match[1] : null;
}

export default function MediaClippings({ clippings, locale, heading }: MediaClippingsProps) {
  const articles = clippings.filter((c) => c.date && !c.source.includes('인터뷰'));
  const interviews = clippings.filter((c) => c.source.includes('인터뷰'));
  const profiles = clippings.filter((c) => !c.date && !c.source.includes('인터뷰'));

  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section aria-labelledby="media-heading">
      <h2 id="media-heading" className="text-2xl font-bold text-neutral-900 mb-10">
        {heading}
      </h2>

      {/* Interviews — YouTube embeds */}
      {interviews.length > 0 && (
        <div className="mb-12">
          <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-widest mb-6">
            {locale === 'ko' ? '인터뷰' : 'Interviews'}
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            {interviews.map((clip, index) => {
              const videoId = extractYouTubeId(clip.url);
              return (
                <div key={index} className="overflow-hidden rounded-xl border border-neutral-200">
                  {videoId && (
                    <div className="relative aspect-video w-full bg-neutral-100">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                        title={clip.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                  )}
                  <div className="px-4 py-3">
                    <p className="text-sm font-medium text-neutral-800 leading-snug">
                      {clip.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Press / News */}
      {sortedArticles.length > 0 && (
        <div className="mb-12">
          <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-widest mb-6">
            {locale === 'ko' ? '보도자료' : 'Press'}
          </h3>
          <ol className="relative">
            <div
              aria-hidden="true"
              className="absolute left-16 top-2 bottom-2 w-px bg-neutral-200 hidden sm:block"
            />
            {sortedArticles.map((clipping, index) => {
              const isLast = index === sortedArticles.length - 1;
              const year = new Date(clipping.date).getFullYear();

              return (
                <li
                  key={index}
                  className={`relative flex flex-col sm:flex-row gap-2 sm:gap-8 ${
                    !isLast ? 'pb-10' : ''
                  }`}
                >
                  <div className="flex-shrink-0 flex sm:flex-col items-center sm:items-end gap-3 sm:gap-0 sm:w-16">
                    <time
                      dateTime={clipping.date}
                      className="text-sm font-semibold text-neutral-400 tabular-nums sm:text-right leading-none"
                    >
                      {year}
                    </time>
                  </div>

                  <div
                    aria-hidden="true"
                    className="hidden sm:flex flex-shrink-0 items-start pt-0.5"
                  >
                    <span className="w-3 h-3 rounded-full bg-neutral-900 ring-4 ring-white flex-shrink-0 mt-0.5" />
                  </div>

                  <div className="flex-1 pb-1">
                    <a
                      href={clipping.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-start gap-2"
                    >
                      <span className="text-base text-neutral-800 leading-relaxed group-hover:underline underline-offset-2 decoration-1">
                        {clipping.title}
                      </span>
                      <svg
                        aria-hidden="true"
                        className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-600 transition-colors flex-shrink-0 mt-1.5"
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
                    <p className="text-sm text-neutral-400 mt-1">
                      {clipping.source} · {formatDate(clipping.date, locale)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {/* Profile Links */}
      {profiles.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-widest mb-6">
            {locale === 'ko' ? '인물정보' : 'Profile'}
          </h3>
          <div className="flex flex-wrap gap-3">
            {profiles.map((clipping, index) => (
              <a
                key={index}
                href={clipping.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:border-neutral-300"
              >
                {clipping.title}
                <svg
                  aria-hidden="true"
                  className="w-3.5 h-3.5 text-neutral-400"
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
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

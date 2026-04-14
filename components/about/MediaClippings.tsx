import type { MediaClipping } from '@/lib/types';

interface MediaClippingsProps {
  clippings: MediaClipping[];
  locale: string;
  heading: string;
}

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat(locale === 'ko' ? 'ko-KR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export default function MediaClippings({ clippings, locale, heading }: MediaClippingsProps) {
  const sorted = [...clippings].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section aria-labelledby="media-heading">
      <h2 id="media-heading" className="text-2xl font-bold text-neutral-900 mb-8">
        {heading}
      </h2>

      <ul className="flex flex-col gap-px divide-y divide-neutral-100" role="list">
        {sorted.map((clipping, index) => (
          <li key={index} className="py-5 first:pt-0 last:pb-0">
            <a
              href={clipping.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 rounded-sm"
              aria-label={`${clipping.title} — ${clipping.source} (${locale === 'ko' ? '새 탭에서 열기' : 'opens in new tab'})`}
            >
              <span className="text-base font-medium text-neutral-900 group-hover:underline decoration-1 underline-offset-2 leading-snug">
                {clipping.title}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm text-neutral-500 font-medium">{clipping.source}</span>
                <span aria-hidden="true" className="text-neutral-300 text-xs">
                  ·
                </span>
                <time
                  dateTime={clipping.date}
                  className="text-sm text-neutral-400"
                >
                  {formatDate(clipping.date, locale)}
                </time>
                <svg
                  aria-hidden="true"
                  className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-600 transition-colors ml-auto flex-shrink-0"
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
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

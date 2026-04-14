import type { ScheduleEvent } from '@/lib/types';

interface EventListProps {
  events: ScheduleEvent[];
  locale: string;
  heading: string;
}

function formatEventDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat(locale === 'ko' ? 'ko-KR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

function formatEventTime(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat(locale === 'ko' ? 'ko-KR' : 'en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: locale !== 'ko',
  }).format(date);
}

export default function EventList({ events, locale, heading }: EventListProps) {
  if (events.length === 0) {
    return (
      <section aria-labelledby="events-heading">
        <h2 id="events-heading" className="text-2xl font-bold text-neutral-900 mb-8">
          {heading}
        </h2>
        <p className="text-neutral-500">
          {locale === 'ko' ? '현재 예정된 일정이 없습니다.' : 'No upcoming events at this time.'}
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="events-heading">
      <h2 id="events-heading" className="text-2xl font-bold text-neutral-900 mb-8">
        {heading}
      </h2>

      <ul className="flex flex-col gap-5" role="list">
        {events.map((event) => {
          const title = locale === 'ko' ? event.title_ko : event.title_en;
          const location = locale === 'ko' ? event.location_ko : event.location_en;
          const description = locale === 'ko' ? event.description_ko : event.description_en;
          const formattedDate = formatEventDate(event.date, locale);
          const formattedTime = formatEventTime(event.date, locale);
          const ticketLabel = locale === 'ko' ? '티켓 / 신청' : 'Tickets / Register';

          return (
            <li
              key={event.id}
              className="rounded-2xl border border-neutral-100 bg-white shadow-sm overflow-hidden"
            >
              <div className="p-6 md:p-8 flex flex-col gap-4 md:flex-row md:gap-10 md:items-start">
                {/* Date block */}
                <div className="flex-shrink-0 flex flex-row md:flex-col items-center md:items-center gap-3 md:gap-1 min-w-[80px]">
                  <time
                    dateTime={event.date}
                    className="text-sm font-bold text-neutral-900 md:text-base leading-none text-center"
                    aria-label={formattedDate}
                  >
                    <span className="block text-2xl font-extrabold tabular-nums leading-none">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="block text-xs font-semibold text-neutral-400 mt-1 uppercase tracking-wide">
                      {new Intl.DateTimeFormat(locale === 'ko' ? 'ko-KR' : 'en-US', {
                        month: 'short',
                      }).format(new Date(event.date))}
                    </span>
                    <span className="block text-xs text-neutral-400 tabular-nums">
                      {new Date(event.date).getFullYear()}
                    </span>
                  </time>
                  <span className="hidden md:block text-xs text-neutral-400 mt-1">
                    {formattedTime}
                  </span>
                </div>

                {/* Divider (desktop) */}
                <div
                  aria-hidden="true"
                  className="hidden md:block w-px self-stretch bg-neutral-100"
                />

                {/* Event content */}
                <div className="flex-1 flex flex-col gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 leading-snug">{title}</h3>
                    <span className="block text-sm text-neutral-400 mt-1 md:hidden">
                      {formattedDate} · {formattedTime}
                    </span>
                  </div>

                  {location && (
                    <div className="flex items-start gap-1.5">
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                      <span className="text-sm text-neutral-500">{location}</span>
                    </div>
                  )}

                  {description && (
                    <p className="text-sm text-neutral-600 leading-relaxed">{description}</p>
                  )}

                  {event.url && (
                    <div className="mt-1">
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 transition-colors"
                        aria-label={`${title} — ${ticketLabel} (${locale === 'ko' ? '새 탭에서 열기' : 'opens in new tab'})`}
                      >
                        {ticketLabel}
                        <svg
                          aria-hidden="true"
                          className="w-3.5 h-3.5"
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
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

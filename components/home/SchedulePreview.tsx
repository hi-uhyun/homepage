import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { ScheduleEvent } from '@/lib/types';

interface SchedulePreviewProps {
  events: ScheduleEvent[];
  locale: string;
}

function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString);
  if (locale === 'ko') {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });
}

function formatTime(dateString: string, locale: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString(locale === 'ko' ? 'ko-KR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: locale !== 'ko',
  });
}

interface EventCardProps {
  event: ScheduleEvent;
  locale: string;
  index: number;
}

function EventCard({ event, locale, index }: EventCardProps) {
  const title = locale === 'ko' ? event.title_ko : event.title_en;
  const location = locale === 'ko' ? event.location_ko : event.location_en;
  const formattedDate = formatDate(event.date, locale);
  const formattedTime = formatTime(event.date, locale);

  const cardContent = (
    <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:gap-6">
      {/* Index number */}
      <span
        className="shrink-0 text-4xl font-bold text-zinc-100"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Event details */}
      <div className="flex-1">
        <h3 className="mb-1 text-base font-semibold text-zinc-900 sm:text-lg">
          {title}
        </h3>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500">
          {/* Date + time */}
          <span className="flex items-center gap-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="1" y="2" width="12" height="11" rx="1.5" />
              <path d="M1 6h12M4 1v2M10 1v2" />
            </svg>
            {formattedDate} · {formattedTime}
          </span>
          {/* Location */}
          {location && (
            <span className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 1C4.79 1 3 2.79 3 5c0 3.5 4 8 4 8s4-4.5 4-8c0-2.21-1.79-4-4-4z" />
                <circle cx="7" cy="5" r="1.5" />
              </svg>
              {location}
            </span>
          )}
        </div>
      </div>

      {/* Arrow */}
      {event.url && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 text-zinc-300 transition-colors group-hover:text-zinc-600"
          aria-hidden="true"
        >
          <path d="M4 10h12M12 6l4 4-4 4" />
        </svg>
      )}
    </div>
  );

  if (event.url) {
    return (
      <a
        href={event.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 rounded-xl"
        aria-label={title}
      >
        {cardContent}
      </a>
    );
  }

  return <div>{cardContent}</div>;
}

export default function SchedulePreview({ events, locale }: SchedulePreviewProps) {
  const t = useTranslations();
  const scheduleHref = `/${locale}/schedule`;
  const previewEvents = events.slice(0, 3);

  return (
    <section
      className="bg-white px-4 py-20"
      aria-label={t('schedule.title')}
    >
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-medium tracking-widest text-zinc-400 uppercase">
              {t('schedule.upcoming')}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              {t('schedule.title')}
            </h2>
          </div>
          <Link
            href={scheduleHref}
            className="hidden text-sm font-medium text-zinc-500 underline-offset-4 hover:text-zinc-900 hover:underline sm:block"
            aria-label={locale === 'ko' ? '일정 전체 보기' : 'View full schedule'}
          >
            {t('common.viewAll')}
          </Link>
        </div>

        {/* Events list */}
        {previewEvents.length > 0 ? (
          <div className="space-y-4">
            {previewEvents.map((event, index) => (
              <EventCard key={event.id} event={event} locale={locale} index={index} />
            ))}
          </div>
        ) : (
          <p className="text-center text-zinc-400">
            {locale === 'ko' ? '예정된 일정이 없습니다.' : 'No upcoming events.'}
          </p>
        )}

        {/* Mobile view all */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href={scheduleHref}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-900 px-6 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          >
            {t('common.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}

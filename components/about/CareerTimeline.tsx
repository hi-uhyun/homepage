import type { CareerItem } from '@/lib/types';

interface CareerTimelineProps {
  career: CareerItem[];
  locale: string;
  heading: string;
}

export default function CareerTimeline({ career, locale, heading }: CareerTimelineProps) {
  const sorted = [...career].sort((a, b) => b.year - a.year);

  return (
    <section aria-labelledby="career-heading">
      <h2 id="career-heading" className="text-2xl font-bold text-neutral-900 mb-10">
        {heading}
      </h2>

      <ol className="relative">
        {/* Vertical line */}
        <div
          aria-hidden="true"
          className="absolute left-16 top-2 bottom-2 w-px bg-neutral-200 hidden sm:block"
        />

        {sorted.map((item, index) => {
          const title = locale === 'ko' ? item.title_ko : item.title_en;
          const isLast = index === sorted.length - 1;

          return (
            <li
              key={`${item.year}-${index}`}
              className={`relative flex flex-col sm:flex-row gap-2 sm:gap-8 ${
                !isLast ? 'pb-10' : ''
              }`}
            >
              {/* Year badge */}
              <div className="flex-shrink-0 flex sm:flex-col items-center sm:items-end gap-3 sm:gap-0 sm:w-16">
                <time
                  dateTime={String(item.year)}
                  className="text-sm font-semibold text-neutral-400 tabular-nums sm:text-right leading-none"
                >
                  {item.year}
                </time>
              </div>

              {/* Dot */}
              <div
                aria-hidden="true"
                className="hidden sm:flex flex-shrink-0 items-start pt-0.5"
              >
                <span className="w-3 h-3 rounded-full bg-neutral-900 ring-4 ring-white flex-shrink-0 mt-0.5" />
              </div>

              {/* Content */}
              <div className="flex-1 pb-1">
                <p className="text-base text-neutral-800 leading-relaxed">{title}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

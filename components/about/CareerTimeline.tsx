import type { CareerItem } from '@/lib/types';

interface CareerTimelineProps {
  career: CareerItem[];
  locale: string;
  heading: string;
}

interface YearGroup {
  year: number;
  items: CareerItem[];
}

function groupByYear(career: CareerItem[]): YearGroup[] {
  const map = new Map<number, CareerItem[]>();
  for (const item of career) {
    const list = map.get(item.year);
    if (list) {
      list.push(item);
    } else {
      map.set(item.year, [item]);
    }
  }
  return Array.from(map.entries())
    .map(([year, items]) => ({ year, items }))
    .sort((a, b) => b.year - a.year);
}

export default function CareerTimeline({ career, locale, heading }: CareerTimelineProps) {
  const groups = groupByYear(career);

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

        {groups.map((group, groupIndex) => {
          const isLast = groupIndex === groups.length - 1;

          return (
            <li
              key={group.year}
              className={`relative flex flex-col sm:flex-row gap-2 sm:gap-8 ${
                !isLast ? 'pb-10' : ''
              }`}
            >
              {/* Year badge */}
              <div className="flex-shrink-0 flex sm:flex-col items-center sm:items-end gap-3 sm:gap-0 sm:w-16">
                <time
                  dateTime={String(group.year)}
                  className="text-sm font-semibold text-neutral-400 tabular-nums sm:text-right leading-none"
                >
                  {group.year}
                </time>
              </div>

              {/* Dot */}
              <div
                aria-hidden="true"
                className="hidden sm:flex flex-shrink-0 items-start pt-0.5"
              >
                <span className="w-3 h-3 rounded-full bg-neutral-900 ring-4 ring-white flex-shrink-0 mt-0.5" />
              </div>

              {/* Content list */}
              <ul className="flex-1 flex flex-col gap-2 pb-1">
                {group.items.map((item, i) => {
                  const title = locale === 'ko' ? item.title_ko : item.title_en;
                  return (
                    <li
                      key={`${group.year}-${i}`}
                      className="text-base text-neutral-800 leading-relaxed"
                    >
                      {title}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

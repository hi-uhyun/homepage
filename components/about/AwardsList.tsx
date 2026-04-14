import type { Award } from '@/lib/types';

interface AwardsListProps {
  awards: Award[];
  locale: string;
  heading: string;
}

export default function AwardsList({ awards, locale, heading }: AwardsListProps) {
  const sorted = [...awards].sort((a, b) => b.year - a.year);

  return (
    <section aria-labelledby="awards-heading">
      <h2 id="awards-heading" className="text-2xl font-bold text-neutral-900 mb-8">
        {heading}
      </h2>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {sorted.map((award, index) => {
          const title = locale === 'ko' ? award.title_ko : award.title_en;

          return (
            <li
              key={`${award.year}-${index}`}
              className="flex flex-col gap-2 rounded-xl border border-neutral-100 bg-neutral-50 px-5 py-5"
            >
              <span className="text-sm font-semibold text-neutral-400 tabular-nums">
                {award.year}
              </span>
              <p className="text-sm font-medium text-neutral-800 leading-snug">{title}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

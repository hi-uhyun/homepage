import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { PortfolioItem, Playlist, Profile } from '@/lib/types';
import PortfolioSection from '@/components/portfolio/PortfolioSection';

interface PortfolioPreviewProps {
  items: PortfolioItem[];
  profile: Profile;
  locale: string;
}

type Category = 'filmography' | 'indie-film' | 'free-acting' | 'voice-acting' | 'music';

const CATEGORIES: Category[] = ['voice-acting', 'filmography', 'indie-film', 'free-acting', 'music'];

const PLAYLIST_MAP: Record<Category, string> = {
  'filmography': '출연영상 모음',
  'indie-film': '',
  'free-acting': '자유연기 모음',
  'voice-acting': '성우 나레이션 모음',
  'music': '노래 모음',
};

export default function PortfolioPreview({ items, profile, locale }: PortfolioPreviewProps) {
  const t = useTranslations();
  const portfolioHref = `/${locale}/portfolio`;

  const categoryLabels: Record<Category, string> = {
    'filmography': t('portfolio.filmography'),
    'indie-film': t('portfolio.indieFilm'),
    'free-acting': t('portfolio.freeActing'),
    'voice-acting': t('portfolio.voiceActing'),
    'music': t('portfolio.music'),
  };

  const playlistLink = t('portfolio.playlistLink');
  const viewAllLabel = t('common.viewAll');

  const featuredByCategory = CATEGORIES.reduce<Record<Category, PortfolioItem[]>>(
    (acc, cat) => {
      acc[cat] = items.filter((item) => item.category === cat && item.isFeatured);
      return acc;
    },
    { 'filmography': [], 'indie-film': [], 'free-acting': [], 'voice-acting': [], 'music': [] }
  );

  const hasAny = CATEGORIES.some((cat) => featuredByCategory[cat].length > 0);
  if (!hasAny) return null;

  return (
    <section className="bg-zinc-50 px-4 py-20" aria-label={t('portfolio.title')}>
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-medium tracking-widest text-zinc-400 uppercase">
              {t('portfolio.featured')}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              {t('portfolio.title')}
            </h2>
          </div>
          <Link
            href={portfolioHref}
            className="hidden items-center gap-1.5 text-sm font-medium text-zinc-500 underline-offset-4 hover:text-zinc-900 hover:underline sm:inline-flex"
          >
            {t('common.viewAll')}
            <svg
              aria-hidden="true"
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="space-y-14">
          {CATEGORIES.map((cat) => {
            const categoryItems = featuredByCategory[cat];
            const playlistTitle = PLAYLIST_MAP[cat];
            const playlist = playlistTitle
              ? profile.playlists.find((p: Playlist) => p.title_ko === playlistTitle)
              : undefined;

            if (categoryItems.length === 0 && !playlist) return null;

            return (
              <PortfolioSection
                key={cat}
                category={cat}
                label={categoryLabels[cat]}
                items={categoryItems}
                playlistUrl={playlist?.url}
                playlistLabel={playlistLink}
                viewAllUrl={`${portfolioHref}#${cat}`}
                viewAllLabel={viewAllLabel}
                locale={locale}
              />
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={portfolioHref}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-900 px-6 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
          >
            {t('common.viewAll')}
            <svg
              aria-hidden="true"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

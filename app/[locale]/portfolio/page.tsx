import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { getPortfolio, getProfile } from '@/lib/data';
import type { PortfolioItem, Playlist } from '@/lib/types';
import PortfolioSection from '@/components/portfolio/PortfolioSection';

export const metadata: Metadata = {
  title: '포트폴리오',
  description:
    '박유현의 출연작, 독립영화, 자유연기, 성우활동, 음악활동 포트폴리오.',
  keywords: ['박유현 포트폴리오', '성우 작품', '배우 작품', '보이스오버'],
};

type Category = 'filmography' | 'indie-film' | 'free-acting' | 'voice-acting' | 'music';

const CATEGORIES: Category[] = ['voice-acting', 'filmography', 'indie-film', 'free-acting', 'music'];

const PLAYLIST_MAP: Record<Category, string> = {
  'filmography': '출연영상 모음',
  'indie-film': '',
  'free-acting': '자유연기 모음',
  'voice-acting': '성우 나레이션 모음',
  'music': '노래 모음',
};

export default async function PortfolioPage() {
  const locale = await getLocale();
  const t = await getTranslations('portfolio');
  const items = getPortfolio();
  const profile = getProfile();

  const categoryLabels: Record<Category, string> = {
    'filmography': t('filmography'),
    'indie-film': t('indieFilm'),
    'free-acting': t('freeActing'),
    'voice-acting': t('voiceActing'),
    'music': t('music'),
  };

  const playlistLink = t('playlistLink');

  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <header className="mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            {t('title')}
          </h1>
        </header>

        <div className="space-y-20">
          {CATEGORIES.map((cat) => {
            const categoryItems = items.filter(
              (item: PortfolioItem) => item.category === cat
            );
            const playlistTitle = PLAYLIST_MAP[cat];
            const playlist = playlistTitle
              ? profile.playlists.find((p: Playlist) => p.title_ko === playlistTitle)
              : undefined;

            return (
              <PortfolioSection
                key={cat}
                category={cat}
                label={categoryLabels[cat]}
                items={categoryItems}
                playlistUrl={playlist?.url}
                playlistLabel={playlistLink}
                locale={locale}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

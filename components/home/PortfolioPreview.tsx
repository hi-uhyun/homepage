import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { PortfolioItem } from '@/lib/types';

interface PortfolioPreviewProps {
  items: PortfolioItem[];
  locale: string;
}

type Category = 'filmography' | 'indie-film' | 'free-acting' | 'voice-acting' | 'music';

const CATEGORIES: Category[] = ['voice-acting', 'filmography', 'indie-film', 'free-acting', 'music'];

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

interface PortfolioCardProps {
  item: PortfolioItem;
  locale: string;
}

function PortfolioCard({ item, locale }: PortfolioCardProps) {
  const title = locale === 'ko' ? item.title_ko : item.title_en;
  const thumbnailSrc = getThumbnailUrl(item);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
        {thumbnailSrc ? (
          <Image
            src={thumbnailSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-200">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="text-zinc-400">
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
              <path d="M16 13l11 7-11 7V13z" fill="currentColor" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="line-clamp-2 text-sm font-medium text-zinc-800">{title}</p>
        <p className="mt-1 text-xs text-zinc-400">{item.year}</p>
      </div>
    </article>
  );
}

export default function PortfolioPreview({ items, locale }: PortfolioPreviewProps) {
  const t = useTranslations();
  const portfolioHref = `/${locale}/portfolio`;

  const categoryLabels: Record<Category, string> = {
    'filmography': t('portfolio.filmography'),
    'indie-film': t('portfolio.indieFilm'),
    'free-acting': t('portfolio.freeActing'),
    'voice-acting': t('portfolio.voiceActing'),
    'music': t('portfolio.music'),
  };

  const featuredByCategory = CATEGORIES.reduce<Record<Category, PortfolioItem[]>>(
    (acc, cat) => {
      acc[cat] = items.filter((item) => item.category === cat && item.isFeatured).slice(0, 3);
      return acc;
    },
    { 'filmography': [], 'indie-film': [], 'free-acting': [], 'voice-acting': [], 'music': [] }
  );

  const hasAny = CATEGORIES.some((cat) => featuredByCategory[cat].length > 0);
  if (!hasAny) return null;

  return (
    <section className="bg-zinc-50 px-4 py-20" aria-label={t('portfolio.title')}>
      <div className="mx-auto max-w-5xl">
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
            className="hidden text-sm font-medium text-zinc-500 underline-offset-4 hover:text-zinc-900 hover:underline sm:block"
          >
            {t('common.viewAll')}
          </Link>
        </div>

        <div className="space-y-14">
          {CATEGORIES.map((cat) => {
            const categoryItems = featuredByCategory[cat];
            if (categoryItems.length === 0) return null;

            return (
              <div key={cat}>
                <h3 className="mb-6 border-b border-zinc-200 pb-3 text-lg font-semibold text-zinc-700">
                  {categoryLabels[cat]}
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryItems.map((item) => (
                    <PortfolioCard key={item.id} item={item} locale={locale} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            href={portfolioHref}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-900 px-6 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
          >
            {t('common.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}

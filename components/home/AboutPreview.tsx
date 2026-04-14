import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { Profile } from '@/lib/types';

interface AboutPreviewProps {
  profile: Profile;
  locale: string;
}

function getBioPreview(bio: string): string {
  // Return the first 2 sentences
  const sentences = bio.match(/[^.!?]+[.!?]+/g) || [];
  return sentences.slice(0, 2).join(' ').trim();
}

export default function AboutPreview({ profile, locale }: AboutPreviewProps) {
  const t = useTranslations();
  const name = locale === 'ko' ? profile.name_ko : profile.name_en;
  const tagline = locale === 'ko' ? profile.tagline_ko : profile.tagline_en;
  const bio = locale === 'ko' ? profile.bio_ko : profile.bio_en;
  const bioPreview = getBioPreview(bio);
  const aboutHref = `/${locale}/about`;

  return (
    <section
      className="bg-white px-4 py-20"
      aria-label={t('about.title')}
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16">
          {/* Profile image */}
          <div className="w-full shrink-0 md:w-72 lg:w-80">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-zinc-100">
              <Image
                src="/images/profile.jpg"
                alt={locale === 'ko' ? `${name} 프로필 사진` : `${name} profile photo`}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col justify-center">
            <p className="mb-2 text-sm font-medium tracking-widest text-zinc-400 uppercase">
              {t('about.title')}
            </p>
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              {name}
            </h2>
            <p className="mb-6 text-base font-medium text-zinc-500">
              {tagline}
            </p>
            <p className="mb-8 text-base leading-relaxed text-zinc-600 sm:text-lg">
              {bioPreview}
            </p>
            <Link
              href={aboutHref}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-900 px-6 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
              aria-label={locale === 'ko' ? '소개 페이지 전체 보기' : 'View full about page'}
            >
              {t('common.viewAll')}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

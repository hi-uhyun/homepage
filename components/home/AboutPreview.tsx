import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { Profile } from '@/lib/types';

interface AboutPreviewProps {
  profile: Profile;
  locale: string;
}

const BIO_HOOK_KO = '인문계에서 독학으로 무대에 섰고, 매니지먼트 없이 300여 편의 광고와 넷플릭스 드라마까지. 장르를 가리지 않고 연기하는 아티스트. 한 번 맡기면 다시 찾게 되는.';
const BIO_HOOK_EN = 'Trained in academics, performed on stage. No management, 300+ commercials to Netflix — an artist who never limits the genre.';

export default function AboutPreview({ profile, locale }: AboutPreviewProps) {
  const t = useTranslations();
  const name = locale === 'ko' ? profile.name_ko : profile.name_en;
  const tagline = locale === 'ko' ? profile.tagline_ko : profile.tagline_en;
  const bioPreview = locale === 'ko' ? BIO_HOOK_KO : BIO_HOOK_EN;
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

            {/* Testimonials */}
            <div className="mb-8 flex flex-col gap-3">
              {[
                { quote: locale === 'ko' ? '내가 믿고 맡기는 최애 성우다' : 'My go-to voice actor — I trust her completely', from: 'S Recording Studio' },
                { quote: locale === 'ko' ? '천명에 한두번 나오는 목소리' : 'A voice you hear once in a thousand', from: 'K Recording Studio' },
                { quote: locale === 'ko' ? '일상을 장면으로 만들어내는 목소리' : 'A voice that turns everyday moments into scenes', from: locale === 'ko' ? 'S 작가' : 'Writer S' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className="text-zinc-300 text-lg leading-none mt-0.5">&ldquo;</span>
                  <div>
                    <span className="text-zinc-700 italic">{item.quote}</span>
                    <span className="text-zinc-400 ml-2">— {item.from}</span>
                  </div>
                </div>
              ))}
            </div>

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

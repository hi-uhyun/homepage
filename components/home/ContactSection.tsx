import { useTranslations } from 'next-intl';
import type { SNSLinks } from '@/lib/types';

interface ContactSectionProps {
  sns: SNSLinks;
  locale: string;
}

export default function ContactSection({ sns, locale }: ContactSectionProps) {
  const t = useTranslations('contact');

  const warmMessage =
    locale === 'ko'
      ? '협업 문의, 광고 캐스팅, 팬 메시지 — 무엇이든 환영합니다.'
      : 'Collaboration inquiries, commercial casting, fan messages — all welcome.';

  return (
    <section
      id="contact"
      className="bg-zinc-950 px-4 py-20 text-white"
      aria-label={t('title')}
    >
      <div className="mx-auto max-w-3xl text-center">
        {/* Section label */}
        <p className="mb-4 text-sm font-medium tracking-widest text-zinc-500 uppercase">
          {t('title')}
        </p>

        {/* Heading */}
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {locale === 'ko' ? '함께 만들어 갈 이야기가 있나요?' : 'Have a story to create together?'}
        </h2>

        {/* Warm CTA message */}
        <p className="mb-10 text-base text-zinc-400 sm:text-lg">
          {warmMessage}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* Primary: KakaoTalk */}
          <a
            href={sns.kakaoOpenChat}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#FEE500] px-8 py-3.5 text-sm font-semibold text-zinc-900 shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FEE500] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 sm:w-auto"
            aria-label={t('kakao')}
          >
            {/* KakaoTalk icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10 2C5.477 2 2 5.13 2 9c0 2.456 1.36 4.625 3.44 5.944l-.876 3.197a.25.25 0 0 0 .365.29L9.06 16.04C9.37 16.06 9.683 16.07 10 16.07c4.523 0 8-3.13 8-7.07C18 5.13 14.523 2 10 2z" />
            </svg>
            {t('kakao')}
          </a>

          {/* Secondary: Email */}
          <a
            href={`mailto:${sns.email}`}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-zinc-600 px-8 py-3.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 sm:w-auto"
            aria-label={t('email')}
          >
            {/* Email icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="14" height="10" rx="1.5" />
              <path d="M2 5l7 5 7-5" />
            </svg>
            {sns.email}
          </a>
        </div>

        {/* Social links */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <a
            href={sns.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded"
            aria-label="YouTube"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M21.3 6.4a2.68 2.68 0 0 0-1.88-1.9C17.78 4 11 4 11 4s-6.78 0-8.42.5A2.68 2.68 0 0 0 .7 6.4C.2 8.06.2 11 .2 11s0 2.94.5 4.6a2.68 2.68 0 0 0 1.88 1.9C4.22 18 11 18 11 18s6.78 0 8.42-.5a2.68 2.68 0 0 0 1.88-1.9c.5-1.66.5-4.6.5-4.6s0-2.94-.5-4.6zM8.8 14V8l5.6 3-5.6 3z" />
            </svg>
          </a>
          <a
            href={sns.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded"
            aria-label="Instagram"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="18" height="18" rx="4" />
              <circle cx="11" cy="11" r="4" />
              <circle cx="16" cy="6" r="0.5" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

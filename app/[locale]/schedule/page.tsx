import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { getProfile } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const profile = getProfile();
  const name = locale === 'ko' ? profile.name_ko : profile.name_en;

  return {
    title: `${name} — ${locale === 'ko' ? '일정' : 'Schedule'}`,
    description:
      locale === 'ko'
        ? '박유현에게 섭외 및 일정 문의를 보내세요.'
        : "Get in touch with Park Yoohyun for booking and schedule inquiries.",
  };
}

export default async function SchedulePage() {
  const locale = await getLocale();
  const t = await getTranslations('schedule');
  const profile = getProfile();
  const { sns } = profile;

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <section>
          <h1 className="text-3xl font-bold text-neutral-900 mb-3 tracking-tight">
            {t('bookTime')}
          </h1>
          <p className="text-base text-neutral-500 mb-12 max-w-xl leading-relaxed">
            {locale === 'ko'
              ? '섭외, 캐스팅, 협업 문의는 아래 연락처로 편하게 연락주세요.'
              : 'For casting, collaboration, and booking inquiries, please reach out through any of the channels below.'}
          </p>

          <div className="flex flex-col gap-5">
            {/* Email */}
            <a
              href={`mailto:${sns.email}`}
              className="group flex items-center gap-4 rounded-xl border border-neutral-200 px-6 py-5 transition-colors hover:bg-neutral-50 hover:border-neutral-300"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200 transition-colors">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="14" height="10" rx="1.5" />
                  <path d="M2 5l7 5 7-5" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  {locale === 'ko' ? '이메일' : 'Email'}
                </p>
                <p className="text-sm text-neutral-500">{sns.email}</p>
              </div>
            </a>

            {/* Instagram DM */}
            <a
              href={sns.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-neutral-200 px-6 py-5 transition-colors hover:bg-neutral-50 hover:border-neutral-300"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  {locale === 'ko' ? '인스타그램 DM' : 'Instagram DM'}
                </p>
                <p className="text-sm text-neutral-500">@hi.uhyun</p>
              </div>
            </a>

            {/* KakaoTalk */}
            <a
              href={sns.kakaoOpenChat}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-neutral-200 px-6 py-5 transition-colors hover:bg-[#FEE500]/10 hover:border-[#FEE500]"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#FEE500]/20 text-neutral-700">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 3C6.477 3 2 6.477 2 10.81c0 2.744 1.677 5.158 4.228 6.597-.187.685-.685 2.497-.784 2.88-.123.476.175.469.367.341.151-.1 2.397-1.63 3.368-2.29A11.3 11.3 0 0 0 12 18.62c5.523 0 10-3.477 10-7.81S17.523 3 12 3z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  {locale === 'ko' ? '카카오톡 오픈채팅' : 'KakaoTalk Open Chat'}
                </p>
                <p className="text-sm text-neutral-500">
                  {locale === 'ko' ? '오픈채팅으로 문의' : 'Chat via KakaoTalk'}
                </p>
              </div>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

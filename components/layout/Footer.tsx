import { getProfile } from '@/lib/data';
import { getTranslations } from 'next-intl/server';

function YouTubeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default async function Footer() {
  const profile = getProfile();
  const { sns } = profile;
  const t = await getTranslations('contact');

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          {/* KakaoTalk CTA */}
          <a
            href={sns.kakaoOpenChat}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#FEE500] text-neutral-900 font-semibold px-6 py-3 rounded-full text-sm hover:bg-[#F5D800] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FEE500] focus-visible:ring-offset-2"
            aria-label="카카오톡 오픈채팅으로 문의하기 (새 탭에서 열림)"
          >
            {/* KakaoTalk bubble icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <path d="M12 3C6.477 3 2 6.477 2 10.81c0 2.744 1.677 5.158 4.228 6.597-.187.685-.685 2.497-.784 2.88-.123.476.175.469.367.341.151-.1 2.397-1.63 3.368-2.29A11.3 11.3 0 0 0 12 18.62c5.523 0 10-3.477 10-7.81S17.523 3 12 3z" />
            </svg>
            {t('kakao')}
          </a>

          {/* SNS links */}
          <div className="flex items-center gap-5" role="list" aria-label="SNS 링크">
            <a
              href={sns.youtube}
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
              aria-label="YouTube 채널 (새 탭에서 열림)"
              className="text-neutral-400 hover:text-red-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded p-1"
            >
              <YouTubeIcon />
            </a>
            <a
              href={sns.instagram}
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
              aria-label="Instagram 프로필 (새 탭에서 열림)"
              className="text-neutral-400 hover:text-pink-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded p-1"
            >
              <InstagramIcon />
            </a>
            <a
              href={`mailto:${sns.email}`}
              role="listitem"
              aria-label={`이메일 보내기: ${sns.email}`}
              className="text-neutral-400 hover:text-neutral-700 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded px-1"
            >
              {sns.email}
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-neutral-400 text-center">
            &copy; {currentYear} 박유현 (Park Yoohyun). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next: 'ko' | 'en') {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  }

  return (
    <div
      className="flex items-center gap-1 text-sm font-medium"
      aria-label="언어 선택 / Language selector"
    >
      <button
        type="button"
        onClick={() => switchLocale('ko')}
        aria-pressed={locale === 'ko'}
        className={[
          'px-1 py-0.5 transition-colors',
          locale === 'ko'
            ? 'font-bold text-neutral-900'
            : 'text-neutral-400 hover:text-neutral-600',
        ].join(' ')}
      >
        KO
      </button>
      <span className="text-neutral-300" aria-hidden="true">|</span>
      <button
        type="button"
        onClick={() => switchLocale('en')}
        aria-pressed={locale === 'en'}
        className={[
          'px-1 py-0.5 transition-colors',
          locale === 'en'
            ? 'font-bold text-neutral-900'
            : 'text-neutral-400 hover:text-neutral-600',
        ].join(' ')}
      >
        EN
      </button>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import LanguageToggle from '@/components/layout/LanguageToggle';

interface NavLink {
  href: string;
  labelKey: 'portfolio' | 'about' | 'schedule' | 'contact';
  isAnchor?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { href: '/portfolio', labelKey: 'portfolio' },
  { href: '/about', labelKey: 'about' },
  { href: '/schedule', labelKey: 'schedule' },
  { href: '/#contact', labelKey: 'contact', isAnchor: true },
];

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const logoText = locale === 'ko' ? '박유현' : 'Park Yoohyun';

  function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        setMenuOpen(false);
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-neutral-100 shadow-sm'
          : 'bg-white/0',
      ].join(' ')}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo / Name */}
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-neutral-900 hover:text-neutral-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded"
            aria-label={`${logoText} - 홈으로 이동`}
          >
            {logoText}
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden sm:flex items-center gap-6"
            aria-label="주요 네비게이션"
          >
            {NAV_LINKS.map(({ href, labelKey, isAnchor }) => {
              const isActive = !isAnchor && pathname === href;
              return (
                <Link
                  key={labelKey}
                  href={href as '/'}
                  onClick={isAnchor ? (e) => handleAnchorClick(e, href) : undefined}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded px-1',
                    isActive
                      ? 'text-neutral-900 font-semibold'
                      : 'text-neutral-500 hover:text-neutral-900',
                  ].join(' ')}
                >
                  {t(labelKey)}
                </Link>
              );
            })}
            <LanguageToggle />
          </nav>

          {/* Mobile: language toggle + hamburger */}
          <div className="flex sm:hidden items-center gap-3">
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="p-1.5 rounded text-neutral-600 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 transition-colors"
            >
              {/* Hamburger / Close icon */}
              <span className="block w-5 h-4 relative" aria-hidden="true">
                <span
                  className={[
                    'absolute left-0 w-full h-0.5 bg-current rounded transition-all duration-200',
                    menuOpen ? 'top-1.5 rotate-45' : 'top-0',
                  ].join(' ')}
                />
                <span
                  className={[
                    'absolute left-0 top-1.5 w-full h-0.5 bg-current rounded transition-all duration-200',
                    menuOpen ? 'opacity-0' : 'opacity-100',
                  ].join(' ')}
                />
                <span
                  className={[
                    'absolute left-0 w-full h-0.5 bg-current rounded transition-all duration-200',
                    menuOpen ? 'top-1.5 -rotate-45' : 'top-3',
                  ].join(' ')}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div
        id="mobile-menu"
        role="navigation"
        aria-label="모바일 네비게이션"
        className={[
          'sm:hidden overflow-hidden transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-neutral-100',
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
        ].join(' ')}
      >
        <nav className="flex flex-col px-4 py-3 gap-1">
          {NAV_LINKS.map(({ href, labelKey, isAnchor }) => {
            const isActive = !isAnchor && pathname === href;
            return (
              <Link
                key={labelKey}
                href={href as '/'}
                onClick={isAnchor ? (e) => handleAnchorClick(e, href) : undefined}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'text-base py-2.5 px-2 rounded font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900',
                  isActive
                    ? 'text-neutral-900 font-semibold bg-neutral-50'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50',
                ].join(' ')}
              >
                {t(labelKey)}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

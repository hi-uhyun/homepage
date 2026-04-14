import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/next';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getProfile } from '@/lib/data';
import { getPersonJsonLd } from '@/lib/seo';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hiuhyun.com';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const profile = getProfile();
  const ogLocale = locale === 'ko' ? 'ko_KR' : 'en_US';

  return {
    title: {
      template: '%s | 박유현',
      default: '박유현 — 성우 · 배우 · 가수',
    },
    description:
      locale === 'ko'
        ? '박유현 공식 홈페이지. 광고 300편 이상의 전문 성우, 배우, 가수 박유현의 포트폴리오 및 문의 페이지입니다.'
        : 'Official website of Park Yoohyun — professional voice actor, actor, and singer with 300+ commercials.',
    keywords:
      locale === 'ko'
        ? ['박유현', '성우', '배우', '가수', '보이스오버', '광고성우', '박유현 공식홈페이지']
        : ['Park Yoohyun', 'voice actor', 'actor', 'singer', 'voiceover', 'Korean voice actor'],
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: SITE_URL,
      siteName: locale === 'ko' ? '박유현' : 'Park Yoohyun',
      title: '박유현 — 성우 · 배우 · 가수',
      description:
        locale === 'ko'
          ? '박유현 공식 홈페이지. 광고 300편 이상의 전문 성우, 배우, 가수 박유현의 포트폴리오 및 문의 페이지입니다.'
          : 'Official website of Park Yoohyun — professional voice actor, actor, and singer with 300+ commercials.',
      images: [
        {
          url: `${SITE_URL}${profile.profileImageUrl}`,
          width: 1200,
          height: 630,
          alt: locale === 'ko' ? '박유현 프로필 사진' : 'Park Yoohyun profile photo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: '박유현 — 성우 · 배우 · 가수',
      description:
        locale === 'ko'
          ? '박유현 공식 홈페이지. 광고 300편 이상의 전문 성우, 배우, 가수 박유현의 포트폴리오 및 문의 페이지입니다.'
          : 'Official website of Park Yoohyun — professional voice actor, actor, and singer with 300+ commercials.',
      images: [`${SITE_URL}${profile.profileImageUrl}`],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'ko' | 'en')) {
    notFound();
  }

  const messages = await getMessages();
  const profile = getProfile();
  const personJsonLd = getPersonJsonLd(profile);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {process.env.NODE_ENV === 'production' && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
      <NextIntlClientProvider messages={messages}>
        <Header />
        <main className="pt-14 sm:pt-16">{children}</main>
        <Footer />
      </NextIntlClientProvider>
      <Analytics />
    </>
  );
}

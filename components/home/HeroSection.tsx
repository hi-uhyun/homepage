import { useTranslations } from 'next-intl';
import type { Profile } from '@/lib/types';

interface HeroSectionProps {
  profile: Profile;
  locale: string;
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(/[?&]v=([^&#]+)/) || url.match(/youtu\.be\/([^?&#]+)/);
  return match ? match[1] : null;
}

export default function HeroSection({ profile, locale }: HeroSectionProps) {
  const t = useTranslations('hero');
  const name = locale === 'ko' ? profile.name_ko : profile.name_en;
  const tagline = locale === 'ko' ? profile.tagline_ko : profile.tagline_en;
  const videoId = extractYouTubeId(profile.demoReelUrl);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
    : null;

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 py-20 text-white"
      aria-label="Hero"
    >
      {/* Background subtle gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-900/60 via-transparent to-zinc-950/80"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        {/* Tagline pill */}
        <p className="mb-6 inline-block rounded-full border border-zinc-700 px-4 py-1.5 text-sm tracking-widest text-zinc-400 uppercase">
          {t('tagline')}
        </p>

        {/* Name */}
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          {name}
        </h1>

        {/* Full tagline */}
        <p className="mx-auto mb-12 max-w-2xl text-lg text-zinc-300 sm:text-xl">
          {tagline}
        </p>

        {/* Demo Reel Embed */}
        {embedUrl && (
          <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl">
            <div className="relative aspect-video w-full">
              <iframe
                src={embedUrl}
                title={locale === 'ko' ? '데모 릴 영상' : 'Demo Reel Video'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-zinc-500"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

'use client';

import dynamic from 'next/dynamic';
import type { Profile } from '@/lib/types';
import BlurText from '@/components/BlurText';

const LightRays = dynamic(() => import('@/components/LightRays'), { ssr: false });

interface HeroSectionProps {
  profile: Profile;
  locale: string;
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(/[?&]v=([^&#]+)/) || url.match(/youtu\.be\/([^?&#]+)/);
  return match ? match[1] : null;
}

export default function HeroSection({ profile, locale }: HeroSectionProps) {
  const name = locale === 'ko' ? profile.name_ko : profile.name_en;
  const videoId = profile.demoReelUrl ? extractYouTubeId(profile.demoReelUrl) : null;
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
    : null;

  return (
    <section
      className="relative flex min-h-[560px] flex-col items-center justify-center overflow-hidden bg-zinc-950 px-4 py-10 text-white sm:min-h-[66vh] sm:py-16"
      aria-label="Hero"
    >
      {/* Light Rays background */}
      <div className="pointer-events-none absolute inset-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#a5b4fc"
          raysSpeed={1.1}
          lightSpread={0.9}
          rayLength={2.2}
          fadeDistance={1.2}
          saturation={1.0}
          followMouse
          mouseInfluence={0.08}
          noiseAmount={0.05}
          distortion={0.02}
        />
      </div>

      {/* Subtle gradient overlay for text readability */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-transparent to-zinc-950/80"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        {/* Tagline pill */}
        <div className="mb-4 inline-block rounded-full border border-zinc-700/50 px-3.5 py-1 text-xs tracking-widest text-zinc-400 uppercase backdrop-blur-sm sm:mb-6 sm:px-4 sm:py-1.5 sm:text-sm">
          {locale === 'ko' ? '300편의 목소리' : '300 Voices, One Artist'}
        </div>

        {/* Name with BlurText animation */}
        <BlurText
          text={name}
          className="mb-3 justify-center text-4xl font-bold tracking-tight text-white sm:mb-4 sm:text-6xl md:text-7xl lg:text-8xl"
          delay={100}
          animateBy="letters"
          direction="bottom"
        />

        {/* Subtitle */}
        <BlurText
          text="Netflix · tvN · SBS · LG · Samsung · Google"
          className="mx-auto mb-6 max-w-2xl justify-center text-sm text-zinc-400 leading-relaxed sm:mb-12 sm:text-lg"
          delay={30}
          animateBy="words"
          direction="bottom"
        />

        {/* Demo Reel Embed */}
        {embedUrl && (
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl border border-zinc-800/50 shadow-2xl backdrop-blur-sm sm:max-w-3xl sm:rounded-2xl">
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

      {/* Scroll indicator (desktop only — mobile hero is now short enough) */}
      <div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce sm:block"
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

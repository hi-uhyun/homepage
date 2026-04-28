'use client';

import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'bgm-pref';
const DEFAULT_VOLUME = 0.35;

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const wasPlayingBeforeDuckRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = DEFAULT_VOLUME;

    const pref = localStorage.getItem(STORAGE_KEY);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldAutoStart = pref !== 'off' && !reducedMotion;

    const triggerEvents = ['click', 'pointerdown', 'touchend', 'keydown', 'wheel', 'scroll'] as const;
    const cleanupTriggers = () => {
      triggerEvents.forEach((evt) =>
        window.removeEventListener(evt, startOnInteraction, { capture: true } as EventListenerOptions),
      );
    };
    const startOnInteraction = () => {
      if (!audio.paused) {
        cleanupTriggers();
        return;
      }
      audio
        .play()
        .then(() => {
          cleanupTriggers();
        })
        .catch(() => {
          // user-activation 부족 — 리스너 유지하여 다음 인터랙션에서 재시도
        });
    };

    if (shouldAutoStart) {
      triggerEvents.forEach((evt) =>
        window.addEventListener(evt, startOnInteraction, { capture: true, passive: true }),
      );
    }

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    const onDuck = () => {
      wasPlayingBeforeDuckRef.current = !audio.paused;
      audio.pause();
    };
    const onResume = () => {
      if (wasPlayingBeforeDuckRef.current && localStorage.getItem(STORAGE_KEY) !== 'off') {
        audio.play().catch(() => {});
      }
      wasPlayingBeforeDuckRef.current = false;
    };
    window.addEventListener('bgm:duck', onDuck);
    window.addEventListener('bgm:resume', onResume);

    const onVisibility = () => {
      if (document.hidden) {
        if (!audio.paused) {
          wasPlayingBeforeDuckRef.current = true;
          audio.pause();
        }
      } else if (wasPlayingBeforeDuckRef.current && localStorage.getItem(STORAGE_KEY) !== 'off') {
        audio.play().catch(() => {});
        wasPlayingBeforeDuckRef.current = false;
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cleanupTriggers();
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      window.removeEventListener('bgm:duck', onDuck);
      window.removeEventListener('bgm:resume', onResume);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          localStorage.setItem(STORAGE_KEY, 'on');
        })
        .catch(() => {});
    } else {
      audio.pause();
      localStorage.setItem(STORAGE_KEY, 'off');
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/bgm.mp3"
        loop
        preload="auto"
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? '배경음악 일시정지' : '배경음악 재생'}
        aria-pressed={isPlaying}
        className="fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white/80 text-neutral-700 shadow-lg backdrop-blur transition-colors hover:bg-white hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
      >
        {isPlaying ? (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <rect x="4" y="3" width="3" height="10" rx="0.5" />
            <rect x="9" y="3" width="3" height="10" rx="0.5" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M5 3.5v9a.5.5 0 0 0 .77.42l7-4.5a.5.5 0 0 0 0-.84l-7-4.5A.5.5 0 0 0 5 3.5z" />
          </svg>
        )}
      </button>
    </>
  );
}

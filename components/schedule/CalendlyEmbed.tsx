'use client';

import { useEffect, useRef } from 'react';

interface CalendlyEmbedProps {
  calendlyUrl?: string;
  kakaoOpenChatUrl: string;
  locale: string;
}

const DEFAULT_CALENDLY_URL = 'https://calendly.com/hiuhyun/meeting';

interface CalendlyMessageEvent extends MessageEvent {
  data: {
    event?: string;
    payload?: {
      event?: {
        start_time?: string;
      };
    };
  };
}

function buildKakaoRedirectUrl(kakaoUrl: string, startTime?: string): string {
  if (!startTime) return kakaoUrl;
  try {
    const date = new Date(startTime);
    const formatted = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    }).format(date);
    const params = new URLSearchParams({ date: formatted });
    const separator = kakaoUrl.includes('?') ? '&' : '?';
    return `${kakaoUrl}${separator}${params.toString()}`;
  } catch {
    return kakaoUrl;
  }
}

export default function CalendlyEmbed({
  calendlyUrl = DEFAULT_CALENDLY_URL,
  kakaoOpenChatUrl,
  locale,
}: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptLoadedRef.current) return;

    const existing = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]');
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
    }
    scriptLoadedRef.current = true;
  }, []);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      const msg = e as CalendlyMessageEvent;
      if (
        typeof msg.data === 'object' &&
        msg.data?.event === 'calendly.event_scheduled'
      ) {
        const startTime = msg.data?.payload?.event?.start_time;
        const redirectUrl = buildKakaoRedirectUrl(kakaoOpenChatUrl, startTime);
        window.open(redirectUrl, '_blank', 'noopener,noreferrer');
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [kakaoOpenChatUrl]);

  const loadingText =
    locale === 'ko' ? '캘린들리 위젯을 불러오는 중...' : 'Loading Calendly widget...';

  return (
    <div className="w-full" aria-label={locale === 'ko' ? '일정 예약 위젯' : 'Schedule booking widget'}>
      {/* Calendly inline widget */}
      <div
        ref={containerRef}
        className="calendly-inline-widget w-full rounded-2xl overflow-hidden border border-neutral-100 bg-white shadow-sm"
        data-url={calendlyUrl}
        style={{ minWidth: '320px', height: '700px' }}
        role="application"
        aria-label={locale === 'ko' ? '캘린들리 예약 폼' : 'Calendly booking form'}
      >
        {/* Fallback while script loads */}
        <div className="flex items-center justify-center h-full text-sm text-neutral-400">
          {loadingText}
        </div>
      </div>
    </div>
  );
}

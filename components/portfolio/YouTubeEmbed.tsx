'use client';

interface YouTubeEmbedProps {
  youtubeUrl: string;
  title: string;
}

export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export function YouTubeEmbed({ youtubeUrl, title }: YouTubeEmbedProps) {
  const videoId = extractVideoId(youtubeUrl);

  if (!videoId) {
    return (
      <div className="aspect-video bg-neutral-100 flex items-center justify-center rounded-lg">
        <p className="text-neutral-500 text-sm">영상을 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  );
}

import Image from 'next/image';
import type { Profile } from '@/lib/types';

interface ProfileDetailProps {
  profile: Profile;
  locale: string;
}

function getYoutubeEmbedUrl(url: string): string {
  const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
}

export default function ProfileDetail({ profile, locale }: ProfileDetailProps) {
  const name = locale === 'ko' ? profile.name_ko : profile.name_en;
  const tagline = locale === 'ko' ? profile.tagline_ko : profile.tagline_en;
  const bio = locale === 'ko' ? profile.bio_ko : profile.bio_en;
  const embedUrl = getYoutubeEmbedUrl(profile.demoReelUrl);

  return (
    <section aria-labelledby="profile-name" className="w-full">
      <div className="flex flex-col gap-12 md:flex-row md:gap-16 lg:gap-24">
        {/* Profile photo */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden bg-neutral-200">
            <Image
              src={profile.profileImageUrl}
              alt={name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
              onError={undefined}
            />
            {/* Gray placeholder overlay shown if image fails */}
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 -z-10">
              <svg
                aria-hidden="true"
                className="w-24 h-24 text-neutral-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-col justify-center gap-6 text-center md:text-left">
          <div>
            <h1
              id="profile-name"
              className="text-4xl font-bold tracking-tight text-neutral-900 lg:text-5xl"
            >
              {name}
            </h1>
            <p className="mt-3 text-lg text-neutral-500 font-medium">{tagline}</p>
          </div>
          <p className="text-base leading-relaxed text-neutral-700 max-w-2xl">{bio}</p>
        </div>
      </div>

      {/* Demo Reel */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">
          {locale === 'ko' ? '데모 릴' : 'Demo Reel'}
        </h2>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 shadow-lg">
          <iframe
            src={embedUrl}
            title={locale === 'ko' ? `${name} 데모 릴` : `${name} Demo Reel`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}

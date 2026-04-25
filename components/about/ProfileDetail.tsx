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

      {/* Testimonials */}
      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        {[
          { quote: locale === 'ko' ? '내가 믿고 맡기는 최애 성우다' : 'My go-to voice actor — I trust her completely', from: 'S Recording Studio' },
          { quote: locale === 'ko' ? '천명에 한두번 나오는 목소리' : 'A voice you hear once in a thousand', from: 'K Recording Studio' },
          { quote: locale === 'ko' ? '일상을 장면으로 만들어내는 목소리' : 'A voice that turns everyday moments into scenes', from: locale === 'ko' ? 'S 작가' : 'Writer S' },
          { quote: locale === 'ko' ? '사운드감독으로 만났는데, 차기작 주인공으로 캐스팅' : 'Met her as a sound director — cast her as the lead in my next film', from: locale === 'ko' ? 'K 감독' : 'Director K' },
        ].map((item, i) => (
          <blockquote
            key={i}
            className="flex flex-col justify-between rounded-xl border border-neutral-100 bg-neutral-50 px-6 py-5"
          >
            <p className="text-base text-neutral-800 leading-relaxed">
              &ldquo;{item.quote}&rdquo;
            </p>
            <cite className="mt-3 block text-sm text-neutral-400 not-italic">
              — {item.from}
            </cite>
          </blockquote>
        ))}
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

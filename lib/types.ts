export interface PortfolioItem {
  id: string;
  title_ko: string;
  title_en: string;
  category: 'filmography' | 'indie-film' | 'free-acting' | 'voice-acting' | 'music';
  tone: string | null; // voice-acting only: e.g., '도도한', '다정한', '내레이션', '힘있는'
  youtubeUrl: string;
  thumbnailUrl: string;
  isFeatured: boolean;
  year: number;
  description_ko: string | null;
  description_en: string | null;
}

export interface CareerItem {
  year: number;
  title_ko: string;
  title_en: string;
}

export interface Award {
  year: number;
  title_ko: string;
  title_en: string;
}

export interface MediaClipping {
  title: string;
  url: string;
  source: string;
  date: string;
}

export interface Playlist {
  title_ko: string;
  title_en: string;
  url: string;
}

export interface SNSLinks {
  youtube: string;
  instagram: string;
  kakaoOpenChat: string;
  email: string;
}

export interface BioContent {
  intro: string;
  highlights: string[];
  outro: string;
}

export interface Profile {
  name_ko: string;
  name_en: string;
  tagline_ko: string;
  tagline_en: string;
  bio_ko: BioContent;
  bio_en: BioContent;
  profileImageUrl: string;
  demoReelUrl: string;
  career: CareerItem[];
  awards: Award[];
  mediaClippings: MediaClipping[];
  playlists: Playlist[];
  sns: SNSLinks;
}

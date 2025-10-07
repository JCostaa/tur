export interface PodcastEpisode {
  id: number;
  title: string;
  description: string;
  duration: string;
  date: string;
  gradient: string;
  icon: string;
  shortTitle: string;
  spotifyUrl?: string;
  publishedAt?: string;
  episodeNumber?: number;
  imageUrl?: string;
  audioPreviewUrl?: string;
  durationMs?: number;
  spotifyId?: string;
}

export interface PodcastShow {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  totalEpisodes: number;
  episodes: PodcastEpisode[];
}

export interface PodcastApiResponse {
  success: boolean;
  data: PodcastShow;
  message?: string;
}

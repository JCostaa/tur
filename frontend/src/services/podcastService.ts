import axios from 'axios';
import type { PodcastApiResponse, PodcastEpisode } from '../types/podcast';
import { env } from '../env';

const API_BASE_URL = env.VITE_API_URL || 'http://localhost:3001';
const SPOTIFY_CLIENT_ID = env.VITE_SPOTIFY_CLIENT_ID  || '9b006e84c7cd4aa4a12ee8adf0c22dac';
const SPOTIFY_CLIENT_SECRET = env.VITE_SPOTIFY_CLIENT_SECRET || 'e6a01e15656a4448938d20ad71826476';
const SPOTIFY_SHOW_ID = '0Gk72vRhktUvbiYGEcuKCT'; // ID do podcast "Vozes do Turismo"

// Mapeamento de ícones para os episódios
const iconMap: Record<string, string> = {
  'trending': 'TrendingUp',
  'public': 'Public',
  'music': 'MusicNote',
  'volume': 'VolumeUp',
  'headphones': 'Headphones',
  'play': 'PlayArrow',
  'calendar': 'CalendarToday',
  'time': 'AccessTime'
};

// Gradientes predefinidos para os episódios
const gradientMap: Record<string, string> = {
  'green': 'linear-gradient(135deg, #4CAF50, #2E7D32)',
  'blue': 'linear-gradient(135deg, #2196F3, #1565C0)',
  'orange': 'linear-gradient(135deg, #FF9800, #E65100)',
  'purple': 'linear-gradient(135deg, #9C27B0, #6A1B9A)',
  'red': 'linear-gradient(135deg, #F44336, #C62828)',
  'teal': 'linear-gradient(135deg, #009688, #00695C)',
  'indigo': 'linear-gradient(135deg, #3F51B5, #283593)',
  'pink': 'linear-gradient(135deg, #E91E63, #AD1457)'
};

// Interface para resposta da API do Spotify
interface SpotifyEpisode {
  id: string;
  name: string;
  description: string;
  duration_ms: number;
  release_date: string;
  external_urls: {
    spotify: string;
  };
  images?: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  audio_preview_url?: string | null;
}

interface SpotifyShowResponse {
  href: string;
  items: SpotifyEpisode[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export const podcastService = {
  // Obter token de acesso do Spotify
  async getSpotifyAccessToken(): Promise<string | null> {
    try {
      if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
        console.warn('Credenciais do Spotify não configuradas');
        return null;
      }

      const response = await axios.post('https://accounts.spotify.com/api/token', 
        'grant_type=client_credentials',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`
          }
        }
      );

      return response.data.access_token;
    } catch (error) {
      console.error('Erro ao obter token do Spotify:', error);
      return null;
    }
  },

  // Buscar episódios do podcast via API do Spotify
  async getEpisodesFromSpotify(): Promise<PodcastApiResponse> {
    try {
      const accessToken = await this.getSpotifyAccessToken();
      
      if (!accessToken) {
        console.warn('Token do Spotify não disponível');
        return {
          success: false,
          data: {
            id: SPOTIFY_SHOW_ID,
            name: "Vozes do Turismo",
            description: "Conecte-se ao fascinante universo do turismo através do nosso podcast exclusivo",
            totalEpisodes: 0,
            episodes: []
          },
          message: 'Token do Spotify não disponível'
        };
      }

      const response = await axios.get(
        `https://api.spotify.com/v1/shows/${SPOTIFY_SHOW_ID}/episodes`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          params: {
            market: 'BR',
            limit: 50,
            offset: 0
          }
        }
      );

      const spotifyData: SpotifyShowResponse = response.data;
      console.log('🎧 Spotify API Response:', spotifyData);
      
      if (!spotifyData || !spotifyData.items) {
        console.warn('❌ Dados inválidos da API do Spotify');
        return {
          success: false,
          data: {
            id: SPOTIFY_SHOW_ID,
            name: "Vozes do Turismo",
            description: "Conecte-se ao fascinante universo do turismo através do nosso podcast exclusivo",
            totalEpisodes: 0,
            episodes: []
          },
          message: 'Dados inválidos da API do Spotify'
        };
      }
      
      console.log('📊 Total episodes:', spotifyData.total);
      console.log('📋 Episodes returned:', spotifyData.items.length);
      
      // Converter episódios do Spotify para nosso formato
      const episodes: PodcastEpisode[] = spotifyData.items.map((episode, index) => ({
        id: parseInt(episode.id.replace(/\D/g, '')) || index + 1,
        title: episode.name,
        description: this.truncateDescription(episode.description),
        duration: this.formatDuration(episode.duration_ms),
        date: this.formatDate(episode.release_date),
        gradient: this.generateGradient(index),
        icon: this.generateIcon(episode.name, index),
        shortTitle: this.generateShortTitle(episode.name),
        spotifyUrl: episode.external_urls.spotify,
        publishedAt: episode.release_date,
        episodeNumber: index + 1,
        imageUrl: episode.images?.[0]?.url || episode.images?.[1]?.url,
        audioPreviewUrl: episode.audio_preview_url || undefined,
        durationMs: episode.duration_ms,
        spotifyId: episode.id
      }));

      return {
        success: true,
        data: {
          id: SPOTIFY_SHOW_ID,
          name: "Vozes do Turismo",
          description: "Conecte-se ao fascinante universo do turismo através do nosso podcast exclusivo",
          totalEpisodes: spotifyData.total,
          episodes: episodes
        }
      };

    } catch (error) {
      console.error('Erro ao buscar episódios do Spotify:', error);
      return {
        success: false,
        data: {
          id: SPOTIFY_SHOW_ID,
          name: "Vozes do Turismo",
          description: "Conecte-se ao fascinante universo do turismo através do nosso podcast exclusivo",
          totalEpisodes: 0,
          episodes: []
        },
        message: 'Erro ao buscar episódios do Spotify'
      };
    }
  },

  // Buscar episódios do podcast (método principal)
  async getEpisodes(): Promise<PodcastApiResponse> {
    try {
      // Usar apenas API do Spotify
      return await this.getEpisodesFromSpotify();
    } catch (error) {
      console.error('Erro ao buscar episódios do podcast:', error);
      // Retornar resposta de erro
      return {
        success: false,
        data: {
          id: SPOTIFY_SHOW_ID,
          name: "Vozes do Turismo",
          description: "Conecte-se ao fascinante universo do turismo através do nosso podcast exclusivo",
          totalEpisodes: 0,
          episodes: []
        },
        message: 'Erro ao carregar episódios do podcast'
      };
    }
  },

  // Buscar episódio específico
  async getEpisode(id: number): Promise<PodcastEpisode | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/podcast/episodes/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar episódio:', error);
      return null;
    }
  },

  // Utilitários
  truncateDescription(description: string, maxLength: number = 150): string {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trim() + '...';
  },

  formatDuration(durationMs: number): string {
    const totalSeconds = Math.floor(durationMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    } else if (minutes > 0) {
      return `${minutes}min ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  },

  generateShortTitle(title: string): string {
    // Extrair palavras-chave do título
    const keywords = title.split(' - ')[0] || title.split(' ')[0];
    return keywords.toUpperCase().substring(0, 20);
  },


  // Formatar data para exibição
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hoje';
    if (diffDays === 2) return 'Ontem';
    if (diffDays <= 7) return `${diffDays} dias atrás`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? 's' : ''} atrás`;
    
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  },

  // Gerar gradiente baseado no ID do episódio
  generateGradient(id: number): string {
    const gradients = Object.values(gradientMap);
    return gradients[id % gradients.length];
  },

  // Gerar ícone baseado no título ou ID
  generateIcon(title: string, id: number): string {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('projeto') || titleLower.includes('catálogo')) return iconMap.trending;
    if (titleLower.includes('planejamento') || titleLower.includes('estratégico')) return iconMap.public;
    if (titleLower.includes('indígena') || titleLower.includes('cultura')) return iconMap.music;
    if (titleLower.includes('governança') || titleLower.includes('gestão')) return iconMap.volume;
    
    // Fallback baseado no ID
    const icons = Object.values(iconMap);
    return icons[id % icons.length];
  }
};

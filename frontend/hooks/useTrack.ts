import { Genre, SpotifyTrack } from '@/types';
import { useEffect, useState } from 'react';
import { hydrateTrackInfo } from '@/services/spotify';

export const useTrack = (songId: string, genre: Genre, accessToken: string) => {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrack = async () => {
      const track = await hydrateTrackInfo(songId, genre, accessToken);
      setTrack(track);
      setIsLoading(false);
    };
    fetchTrack();
  }, [songId, accessToken]);

  return { track, isLoading };
};

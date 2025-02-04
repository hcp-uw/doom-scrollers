import { Song } from '@/types';
import { useState, useEffect } from 'react';
import { getRecommendations } from '@/services/songs';

export const useSongs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true);
      const songs = await getRecommendations();
      setSongs(songs);
      setIsLoading(false);
    };
    fetchSongs();
  }, []);

  return { songs, isLoading };
};

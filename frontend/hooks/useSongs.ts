import { Song } from '@/types';
import { useState, useEffect } from 'react';
import { getRecommendations } from '@/services/songs';

export const useSongs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchSongs = async () => {
    setIsLoading(true);
    const songs = await getRecommendations();
    setSongs((prev) => [...prev, ...songs]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return { songs, isLoading, fetchSongs };
};

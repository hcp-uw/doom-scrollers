import { useState } from 'react';
import { getPlaylists } from '@/services/playlist';
import { useEffect } from 'react';
import { Playlist } from '@/types';

export const usePlaylist = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchPlaylists = async () => {
    setIsLoading(true);
    try {
      const playlists = await getPlaylists();
      setPlaylists(playlists);
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return { playlists, isLoading, error, fetchPlaylists };
};

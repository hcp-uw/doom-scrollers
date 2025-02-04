import { getSpotifyCredentials } from '@/utils/spotify';
import { useState, useEffect } from 'react';
export const useSpotify = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);

  useEffect(() => {
    const fetchAllInfo = async () => {
      const { accessToken, refreshToken, expiration } =
        await getSpotifyCredentials();
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setExpiresIn(expiration);
    };
    fetchAllInfo();
  }, []);

  return { accessToken, refreshToken, expiresIn };
};

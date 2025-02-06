import { SpotifyDevice } from '@/types';
import { getSpotifyCredentials } from '@/utils/spotify';

export const playTrack = async (
  trackId: string,
  token: string,
  deviceId: string
) => {
  const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      uris: [`spotify:track:${trackId}`],
    }),
  });
  const data = await response.json();
};

export const getSpotifyDevices = async () => {
  const { accessToken: token } = await getSpotifyCredentials();

  const response = await fetch('https://api.spotify.com/v1/me/player/devices', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data.devices as SpotifyDevice[];
};

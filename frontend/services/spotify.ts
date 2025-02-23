import { SpotifyTrack, SpotifyArtist, SpotifyImage, Genre } from '@/types';

export const hydrateTrackInfo = async (
  songId: string,
  accessToken: string
): Promise<SpotifyTrack> => {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  return {
    name: data.name,
    id: data.id,
    artists: data.artists,
    album: {
      name: data.album.name,
      id: data.album.id,
      images: data.album.images,
    },
    duration_ms: data.duration_ms,
  };
};

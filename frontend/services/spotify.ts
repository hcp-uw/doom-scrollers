import { SpotifyTrack, SpotifyArtist, SpotifyImage, Genre } from '@/types';

export const hydrateTrackInfo = async (
  songId: string,
  genre: Genre,
  accessToken: string
): Promise<SpotifyTrack> => {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  const res = {
    name: data.name,
    id: data.id,
    artists: data.artists as SpotifyArtist[],
    album: {
      name: data.album.name,
      id: data.album.id,
      images: data.album.images as SpotifyImage[],
    },
    duration_ms: data.duration_ms,
    genre: genre.value,
  };

  return res;
};

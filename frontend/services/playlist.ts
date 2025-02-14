import { LOCAL_API_ENDPOINT } from '@/constants';
import { getCookie } from '@/utils/cookies';

export const addSongToPlaylist = async (songId: string, playlistId: string) => {
  const response = await fetch(`${LOCAL_API_ENDPOINT}/playlist/song/add`, {
    method: 'PUT',
    headers: {
      Cookie: (await getCookie())!,
    },
    body: JSON.stringify({ songId, playlistId }),
  });

  const data = await response.json();
  return data;
};

export const removeSongFromPlaylist = async (
  songId: string,
  playlistId: string
) => {
  const response = await fetch(`${LOCAL_API_ENDPOINT}/playlist/song/remove`, {
    method: 'PUT',
    headers: {
      Cookie: (await getCookie())!,
    },
    body: JSON.stringify({ songId, playlistId }),
  });

  const data = await response.json();
  return data;
};

export const getPlaylists = async () => {
  const response = await fetch(`${LOCAL_API_ENDPOINT}/playlist/me`, {
    headers: {
      Cookie: (await getCookie())!,
    },
  });

  const data = await response.json();
  return data;
};

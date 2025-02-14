import { LOCAL_API_ENDPOINT } from '@/constants';
import { Playlist } from '@/types';
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
  return !!data.success;
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
  return !!data.success;
};

export const getPlaylists = async () => {
  const response = await fetch(`${LOCAL_API_ENDPOINT}/playlist/me`, {
    headers: {
      Cookie: (await getCookie())!,
    },
  });

  const data = await response.json();
  return data.playlists as Playlist[];
};

export const createPlaylist = async (name: string) => {
  const response = await fetch(`${LOCAL_API_ENDPOINT}/playlist/create`, {
    method: 'POST',
    headers: {
      Cookie: (await getCookie())!,
    },
    body: JSON.stringify({ name }),
  });

  const data = await response.json();
  return data.playlist as Playlist;
};

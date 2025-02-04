import { LOCAL_API_ENDPOINT } from '@/constants';
import { Genre } from '@/types';
import { getCookie } from '@/utils/cookies';

export const getUserGenres = async (): Promise<Genre[]> => {
  const response = await fetch(`${LOCAL_API_ENDPOINT}/user/`, {
    headers: {
      Cookie: (await getCookie())!,
    },
  });
  const data = await response.json();
  return data.user.preferences as Genre[];
};

export const selectGenre = async (genreName: string) => {
  const response = await fetch(`${LOCAL_API_ENDPOINT}/genre/add`, {
    method: 'PUT',
    headers: {
      Cookie: (await getCookie())!,
    },
    body: JSON.stringify({ genreName }),
  });
  const data = await response.json();
  return data.genre as Genre;
};

export const deselectGenre = async (genreName: string) => {
  const response = await fetch(`${LOCAL_API_ENDPOINT}/genre/remove`, {
    method: 'PUT',
    headers: {
      Cookie: (await getCookie())!,
    },
    body: JSON.stringify({ genreName }),
  });
  const data = await response.json();
  return data.genre as Genre;
};

export const getAllGenres = async (): Promise<Genre[]> => {
  const response = await fetch(`${LOCAL_API_ENDPOINT}/genre/`);
  const data = await response.json();
  return data.genres as Genre[];
};

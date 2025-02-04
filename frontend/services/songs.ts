import { LOCAL_API_ENDPOINT } from '@/constants';
import { Song } from '@/types';
import { getCookie } from '@/utils/cookies';

export const getRecommendations = async (size: number = 10) => {
  const response = await fetch(
    `${LOCAL_API_ENDPOINT}/songs/recommendations?size=${size}`,
    {
      headers: {
        Cookie: (await getCookie())!,
      },
    }
  );
  const data = await response.json();
  return data.songs as Song[];
};

export const likeTrack = async (trackID: string) => {
  const response = await fetch(`${LOCAL_API_ENDPOINT}/songs/like`, {
    method: 'PUT',
    body: JSON.stringify({ trackID }),
    headers: {
      Cookie: (await getCookie())!,
    },
  });
  const data = await response.json();
  return data.success;
};

export const dislikeTrack = async (trackID: string) => {
  const response = await fetch(`${LOCAL_API_ENDPOINT}/songs/dislike`, {
    method: 'PUT',
    body: JSON.stringify({ trackID }),
    headers: {
      Cookie: (await getCookie())!,
    },
  });
  const data = await response.json();
  return data.success;
};

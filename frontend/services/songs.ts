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

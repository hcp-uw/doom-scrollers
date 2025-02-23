import { LOCAL_API_ENDPOINT } from '@/constants';
import { FeedItem } from '@/types';
import { getCookie } from '@/utils/cookies';

export const getFeed = async (): Promise<FeedItem[]> => {
  const response = await fetch(`${LOCAL_API_ENDPOINT}/friends/feed`, {
    headers: {
      Cookie: (await getCookie())!,
    },
  });
  const body = await response.json();
  console.log(body);
  return body.friends as FeedItem[];
};

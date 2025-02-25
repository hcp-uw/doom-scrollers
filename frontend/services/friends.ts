import { LOCAL_API_ENDPOINT } from '@/constants';
import { FeedItem, User } from '@/types';
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

export const removeFriend = async (friendId: number) => {
  const response = await fetch(`${LOCAL_API_ENDPOINT}/friends/remove`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Cookie: (await getCookie())!,
    },
    body: JSON.stringify({ friendId }),
  });

  const body = await response.json();

  return body.user as User;
};

import { LOCAL_API_ENDPOINT } from '@/constants';
import { FriendRequest } from '@/types';
import { getCookie } from '@/utils/cookies';

export const sendFriendRequest = async (to: number) => {
  const response = await fetch(`${LOCAL_API_ENDPOINT}/friends/requests/add`, {
    method: 'POST',
    headers: {
      Cookie: (await getCookie())!,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ to }),
  });
  const body = await response.json();
  return !!body.result;
};

export const getFriendRequests = async () => {
  const response = await fetch(`${LOCAL_API_ENDPOINT}/friends/requests/`, {
    headers: {
      Cookie: (await getCookie())!,
      'content-type': 'application/json',
    },
  });

  const body = await response.json();
  return body.friendRequests as FriendRequest[];
};

export const handleFriendRequest = async (
  friendRequestId: number,
  action: 'accept' | 'decline'
) => {
  const response = await fetch(
    `${LOCAL_API_ENDPOINT}/friends/requests/handle`,
    {
      method: action === 'accept' ? 'PUT' : 'DELETE',
      headers: {
        Cookie: (await getCookie())!,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ id: friendRequestId }),
    }
  );
  const body = await response.json();
  return !!body.success;
};

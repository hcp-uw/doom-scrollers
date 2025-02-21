import { LOCAL_API_ENDPOINT } from '@/constants';
import { getCookie } from '@/utils/cookies';

export const sendFriendRequest = async (to: number) => {
  console.log('here');
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

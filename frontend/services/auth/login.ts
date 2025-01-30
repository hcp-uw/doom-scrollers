import { LOCAL_API_ENDPOINT } from '@/constants';
import { ErrorResponse, User } from '@/types';
import { saveCookie } from '@/utils/cookies';

export const login = async (
  username: string,
  password: string
): Promise<[User | null, ErrorResponse | null]> => {
  const response = await fetch(`${LOCAL_API_ENDPOINT}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
    },
    body: JSON.stringify({ username, password }),
  });

  saveCookie(response.headers.get('set-cookie')!);

  const data = await response.json();

  console.log(data);

  if (data.error) {
    return [null, { error: data.error }];
  }

  return [data.user as User, null];
};

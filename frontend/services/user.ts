import { LOCAL_API_ENDPOINT } from '@/constants';
import { getCookie } from '@/utils/cookies';
import { User, ErrorResponse } from '@/types';

export const updateUser = async ({
  username,
  oldPassword,
  newPassword,
}: {
  username?: string;
  oldPassword?: string;
  newPassword?: string;
}): Promise<[User | null, ErrorResponse | null]> => {
  const response = await fetch(`${LOCAL_API_ENDPOINT}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Cookie: (await getCookie())!,
    },
    body: JSON.stringify({
      username,
      oldPassword,
      newPassword,
    }),
  });

  const data = await response.json();

  if (data.error) {
    return [null, { error: data.error }];
  }

  return [data.user, null];
};

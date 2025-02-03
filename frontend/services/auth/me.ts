import { LOCAL_API_ENDPOINT } from '@/constants';
import { ErrorResponse, User } from '@/types';
import { getCookie } from '@/utils/cookies';

export const getCurrentSession = async (): Promise<
  [User | null, ErrorResponse | null]
> => {
  const response = await fetch(`${LOCAL_API_ENDPOINT}/user`, {
    headers: {
      Cookie: (await getCookie())!,
    },
  });
  const data = await response.json();

  console.log(data);

  if (data.error) {
    return [null, { error: data.error }];
  }

  return [
    {
      ...(data.user as User),
      createdAt: new Date(data.user.createdAt),
      updatedAt: new Date(data.user.updatedAt),
    },
    null,
  ];
};

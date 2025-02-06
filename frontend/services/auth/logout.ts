import { LOCAL_API_ENDPOINT } from '@/constants';
import { getCookie, deleteCookie } from '@/utils/cookies';

export const logout = async () => {
  const response = await fetch(`${LOCAL_API_ENDPOINT}/user/logout`, {
    method: 'POST',
    headers: {
      Cookie: (await getCookie())!,
    },
  });
  await Promise.all([response.json(), deleteCookie()]);
};

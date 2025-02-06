import * as SecureStore from 'expo-secure-store';

const COOKIE_KEY = 'auth-cookie';

export const saveCookie = async (cookieValue: string) => {
  await SecureStore.setItemAsync(COOKIE_KEY, cookieValue);
};

export const getCookie = async () => {
  return await SecureStore.getItemAsync(COOKIE_KEY);
};

export const deleteCookie = async () => {
  await SecureStore.deleteItemAsync(COOKIE_KEY);
};

import { AccessTokenResponse } from '../types';
import { makeRedirectUri } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'spotify-access-token';
const EXPIRATION_KEY = 'spotify-expiration';
const REFRESH_TOKEN_KEY = 'spotify-refresh-token';

export const getClientId = () => {
  return process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
};

const getClientSecret = () => {
  return process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;
};

const generateAccessTokenParams = (code: string) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', makeRedirectUri());
  return params.toString();
};

export const fetchAccessToken = async (code: string) => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: generateAccessTokenParams(code),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(getClientId() + ':' + getClientSecret()),
    },
  });
  const json = (await response.json()) as AccessTokenResponse;
  saveSpotifyCredentials(
    json.access_token,
    json.expires_in,
    json.refresh_token
  );
  console.log(json);
  return {
    accessToken: json.access_token,
    expiration: json.expires_in,
    refreshToken: json.refresh_token,
  };
};

export const saveSpotifyCredentials = async (
  accessToken: string,
  expiration: number,
  refreshToken: string
) => {
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  await AsyncStorage.setItem(
    EXPIRATION_KEY,
    (Date.now() + expiration).toString()
  );
  await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const getSpotifyCredentials = async () => {
  const storedExpiration = await AsyncStorage.getItem(EXPIRATION_KEY);
  return {
    accessToken: await AsyncStorage.getItem(ACCESS_TOKEN_KEY),
    expiration: storedExpiration ? parseInt(storedExpiration) : null,
    refreshToken: await AsyncStorage.getItem(REFRESH_TOKEN_KEY),
  };
};

export const validateSpotifyCredentials = async () => {
  const { accessToken, expiration, refreshToken } =
    await getSpotifyCredentials();

  if (!expiration || Date.now() > expiration) {
    console.log('credentials expired');
    // Refresh if credentials expired and refresh token is available
    if (refreshToken) {
      console.log('refreshing credentials');
      await refreshAccessToken(refreshToken);
      return true;
    } else {
      return false;
    }
  }

  return !!accessToken && !!refreshToken;
};

const generateRefreshTokenParams = (refreshToken: string) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);
  params.append('client_id', getClientId()!);
  return params.toString();
};

export const refreshAccessToken = async (refreshToken: string) => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: generateRefreshTokenParams(refreshToken),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(getClientId() + ':' + getClientSecret()),
    },
  });
  const json = await response.json();
  console.log('refreshed credentials');
  console.log('refreshed json', json);
  await saveSpotifyCredentials(
    json.access_token,
    json.expires_in,
    refreshToken
  );
};

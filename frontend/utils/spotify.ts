import { AccessTokenResponse } from '../types';
import { makeRedirectUri } from 'expo-auth-session';

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
  console.log(json);
  return {
    accessToken: json.access_token,
    expiration: json.expires_in,
    refreshToken: json.refresh_token,
  };
};

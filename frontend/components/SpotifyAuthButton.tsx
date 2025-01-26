import { useEffect } from 'react';
import { Button } from 'react-native';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { fetchAccessToken, getClientId } from '../utils/spotify';

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export const SpotifyAuthButton = () => {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: getClientId(),
      scopes: ['user-read-private user-read-email user-library-read'],
      usePKCE: false,
      redirectUri: makeRedirectUri({
        native: 'doom-scrollers://',
      }),
    },
    discovery
  );

  const handleUserAuthentication = async (code: string) => {
    const { accessToken, expiration, refreshToken } = await fetchAccessToken(
      code
    );

    console.log({ accessToken, expiration, refreshToken });
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      handleUserAuthentication(code);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login With Spotify"
      onPress={() => {
        promptAsync();
      }}
    />
  );
};

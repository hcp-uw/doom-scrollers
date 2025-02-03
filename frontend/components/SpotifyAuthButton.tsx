import { useEffect } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { fetchAccessToken, getClientId } from '../utils/spotify';
import Entypo from '@expo/vector-icons/Entypo';

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const SpotifyAuthButton: React.FC<Props> = ({ style }) => {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: getClientId()!,
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
    <TouchableOpacity
      disabled={!request}
      onPress={() => {
        promptAsync();
      }}
      style={{
        ...styles.spotifyButton,
        ...(style as object),
      }}
    >
      <View style={styles.spotifyButtonInner}>
        <Entypo name="spotify" style={{ marginRight: 10 }} size={24} />
        <Text style={styles.spotifyButtonText}>Authenticate Spotify</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  spotifyButton: {
    borderRadius: 10,
    backgroundColor: '#1ED760',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexShrink: 0,
    width: '60%',
    textAlign: 'center',
  },
  spotifyButtonText: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'LexendDeca_500Medium',
  },
  spotifyButtonInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

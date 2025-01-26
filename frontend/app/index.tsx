import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { SpotifyAuthButton } from '../components/SpotifyAuthButton';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from 'react-native-dotenv';
import { Header } from '../components/Header';
import InputField from '../components/InputField';
import { GoogleAuthButton } from '../components/GoogleAuthButton';

const Index = () => {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <Header
          text="Register"
          style={{
            marginBottom: 20,
          }}
        />
        <InputField
          label="Username"
          placeholder="Username"
          style={{
            marginBottom: 20,
            width: '80%',
          }}
        />
        <SpotifyAuthButton
          clientId={SPOTIFY_CLIENT_ID}
          secret={SPOTIFY_CLIENT_SECRET}
        />
        <GoogleAuthButton style={{ marginTop: 10 }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
  },
});

export default Index;

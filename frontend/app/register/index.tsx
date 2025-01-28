import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { SpotifyAuthButton } from '@/components/SpotifyAuthButton';
import { Header } from '@/components/Header';
import { InputField } from '@/components/InputField';

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
            marginBottom: 10,
            width: '80%',
          }}
        />
        <InputField
          label="Password"
          placeholder="Password"
          style={{
            marginBottom: 20,
            width: '80%',
          }}
          kind="password"
        />
        <SpotifyAuthButton />
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

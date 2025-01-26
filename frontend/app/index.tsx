import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { SpotifyAuthButton } from '../components/SpotifyAuthButton';

const Index = () => {
  return (
    <SafeAreaView>
      <Text>Hello, World</Text>
      <SpotifyAuthButton />
    </SafeAreaView>
  );
};

export default Index;

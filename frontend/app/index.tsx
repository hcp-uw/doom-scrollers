import { SpotifyAuthButton } from '@/components/SpotifyAuthButton';
import { SafeAreaView, Text } from 'react-native';

const Index = () => {
  return (
    <>
      <SafeAreaView>
        <Text>Hello, world</Text>
        <SpotifyAuthButton />
      </SafeAreaView>
    </>
  );
};

export default Index;

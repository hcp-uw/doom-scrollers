import { Button } from '@/components/Button';
import { SpotifyAuthButton } from '@/components/SpotifyAuthButton';
import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Index = () => {
  const router = useRouter();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Button
          title="Go To Register Page"
          onPress={() => {
            router.navigate('/register');
          }}
          style={{
            marginBottom: 20,
          }}
        />
        <Button
          title="Go To Login Page"
          onPress={() => {
            router.navigate('/login');
          }}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Index;

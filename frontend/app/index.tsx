import { SpotifyAuthButton } from '@/components/SpotifyAuthButton';
import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Index = () => {
  const router = useRouter();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            router.navigate('/register');
          }}
        >
          <Text>Go To Register Page</Text>
        </TouchableOpacity>
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

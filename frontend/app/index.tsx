import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const Index = () => {
  const router = useRouter();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
          <Header
            text="tune scrollers."
            style={{
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
              width: '100%',
              fontSize: 45,
            }}
          />
          <Text
            style={{
              marginBottom: 120,
              fontSize: 15,
              textAlign: 'center',
              width: '100%',
            }}
          >
            discover and connect like never before
          </Text>
          <Button
            title="register"
            onPress={() => {
              router.navigate('/register');
            }}
            style={{
              marginBottom: 20,
              width: '50%',
            }}
            kind="secondary"
          />
          <Button
            title="login"
            onPress={() => {
              router.navigate('/login');
            }}
            kind="secondary"
            style={{
              width: '50%',
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#a568ff',
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    width: '100%',
  },
});

export default Index;

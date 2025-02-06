import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import CurveTextSVG from '@/assets/svgs/heroText.svg';
import HeroImageSVG from '@/assets/svgs/heroImage.svg';
import HeroBorderSVG from '@/assets/svgs/heroBorder.svg';

const Index = () => {
  const router = useRouter();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
          <CurveTextSVG
            style={{ position: 'absolute', top: '23%', left: '13.5%' }}
          />
          <HeroBorderSVG style={{ position: 'absolute', top: '31%' }} />
          <HeroImageSVG style={{ position: 'absolute', top: '30%' }} />
          <Button
            title="register"
            onPress={() => {
              router.navigate('/register');
            }}
            style={{
              marginBottom: 20,
              width: '50%',
              marginTop: 100,
            }}
          />
          <Button
            title="login"
            onPress={() => {
              router.navigate('/login');
            }}
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
    backgroundColor: 'black',
  },
  view: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '80%',
    width: '100%',
  },
});

export default Index;
